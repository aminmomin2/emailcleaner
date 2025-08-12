'use client';

/**
 * Main application page component for EmailCleaner
 * 
 * This component serves as the primary interface for the email cleanup application.
 * It handles user authentication, Gmail synchronization, and AI-powered email cleanup suggestions.
 * 
 * Key Features:
 * - OAuth authentication with Google
 * - Gmail account synchronization
 * - AI-powered email cleanup suggestions
 * - Bulk email operations (archive, trash, delete)
 * - Real-time feedback with toast notifications
 * - Confirmation modals for destructive actions
 * 
 * @author Amin Momin
 * @version 1.0.0
 */

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { useModal } from "@/components/ui/Modal";

/**
 * User interface representing authenticated user data
 * Extends the base NextAuth user with additional properties
 */
interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * Cleanup suggestion interface representing AI-generated email cleanup recommendations
 * 
 * @property emailId - Unique identifier for the email in our system
 * @property providerEmailId - Gmail's internal email ID
 * @property from - Email sender address
 * @property subject - Email subject line
 * @property snippet - Brief preview of email content
 * @property reason - AI-generated explanation for the cleanup suggestion
 * @property suggestedAction - Recommended action (archive, trash, or delete permanently)
 */
interface CleanupSuggestion {
  emailId: string;
  providerEmailId: string;
  from: string;
  subject: string;
  snippet: string;
  reason: string;
  suggestedAction: 'archive' | 'trash' | 'delete_permanently';
}

export default function Home() {
  // Authentication and user state management
  const { user, isAuthenticated, isLoading } = useAuth();
  const { addToast } = useToast();
  const { showModal } = useModal();
  const userId = (user as User | null)?.id;

  // Gmail synchronization state
  const [hasSynced, setHasSynced] = useState<boolean | null>(null);
  const [syncing, setSyncing] = useState(false);

  // AI cleanup suggestions state management
  const [cleanupSuggestions, setCleanupSuggestions] = useState<CleanupSuggestion[] | null>(null);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  /**
   * Fetch user's Gmail sync state on component mount
   * Determines whether the user has already connected their Gmail account
   */
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      setHasSynced(null);
      return;
    }
    fetch('/api/user/sync-state')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch sync state');
        return res.json();
      })
      .then(data => setHasSynced(data.hasSynced))
      .catch(() => setHasSynced(false));
  }, [isAuthenticated, userId]);

  /**
   * Handle initial Gmail synchronization
   * Connects user's Gmail account and syncs recent emails
   */
  const handleFirstSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/sync', { method: 'POST' });
      if (res.ok) {
        await fetch('/api/user/set-synced', { method: 'POST' });
        setHasSynced(true);
        addToast({
          type: 'success',
          title: 'Gmail Connected!',
          message: 'Your Gmail account has been successfully connected and synced.'
        });
      } else {
        throw new Error('Sync failed');
      }
    } catch (error) {
      console.error('Sync error:', error);
      addToast({
        type: 'error',
        title: 'Sync Failed',
        message: 'Failed to sync. Please try again.'
      });
    } finally {
      setSyncing(false);
    }
  };

  const loadCleanupSuggestions = useCallback(() => {
    if (!isAuthenticated || !userId) return;
    setCleanupLoading(true);
    fetch("/api/ai/suggest-cleanups")
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('AUTH_REQUIRED');
          }
          throw new Error('Failed to load suggestions');
        }
        return res.json();
      })
      .then((data) => {
        setCleanupSuggestions(data.suggestions || []);
        setCleanupLoading(false);
        if (data.suggestions && data.suggestions.length > 0) {
          addToast({
            type: 'info',
            title: 'Suggestions Loaded',
            message: `Found ${data.suggestions.length} cleanup suggestions for your inbox.`
          });
        }
      })
      .catch((error) => {
        console.error('Error loading suggestions:', error);
        setCleanupLoading(false);
        
        if (error.message === 'AUTH_REQUIRED') {
          addToast({
            type: 'warning',
            title: 'Authentication Required',
            message: 'Your Google account access has expired. Please reconnect your Gmail account to continue.',
            duration: 8000
          });
          window.location.href = '/auth/signin';
        }
        // Don't show alert for other errors as it might be a network issue
      });
  }, [isAuthenticated, userId]);

  const generateCleanupSuggestions = async () => {
    setGenerating(true);
    try {
      const response = await fetch("/api/ai/generate-cleanups", {
        method: "POST",
      });
      const data = await response.json();
      
      if (response.ok) {
        await loadCleanupSuggestions();
        addToast({
          type: 'success',
          title: 'Suggestions Generated!',
          message: `Generated ${data.count} new suggestions!`
        });
      } else {
        throw new Error(data.message || 'Failed to generate suggestions');
      }
    } catch (error) {
      console.error('Error generating suggestions:', error);
      addToast({
        type: 'error',
        title: 'Generation Failed',
        message: 'Failed to generate suggestions. Please try again.'
      });
    } finally {
      setGenerating(false);
    }
  };

  const performCleanupAction = async (emailId: string, action: string) => {
    try {
      const response = await fetch("/api/ai/execute-cleanup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, action }),
      });
      
      if (response.ok) {
        // Remove the processed suggestion
        setCleanupSuggestions(prev => prev?.filter(s => s.emailId !== emailId) || null);
        const actionText = action === 'archive' ? 'archived' : action === 'trash' ? 'moved to trash' : 'deleted';
        addToast({
          type: 'success',
          title: 'Email Processed!',
          message: `Email has been ${actionText} successfully.`
        });
      } else {
        const data = await response.json();
        
        // Check if this is an OAuth token expiration error
        if (data.requiresReauth || data.message?.includes('OAuth tokens have expired')) {
          addToast({
            type: 'warning',
            title: 'Authentication Required',
            message: 'Your Google account access has expired. Please reconnect your Gmail account to continue.',
            duration: 8000
          });
          // Optionally redirect to re-authentication
          window.location.href = '/auth/signin';
          return;
        }
        
        throw new Error(data.message || 'Failed to execute cleanup');
      }
    } catch (error) {
      console.error('Error executing cleanup:', error);
      addToast({
        type: 'error',
        title: 'Cleanup Failed',
        message: 'Failed to execute cleanup. Please try again.'
      });
    }
  };

      const performBulkDelete = async () => {
    if (!cleanupSuggestions || cleanupSuggestions.length === 0) return;
    
    try {
      // Execute all cleanup actions
      const promises = cleanupSuggestions.map(suggestion => 
        fetch("/api/ai/execute-cleanup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            emailId: suggestion.emailId, 
            action: suggestion.suggestedAction 
          }),
        })
      );
      
      const results = await Promise.allSettled(promises);
      
      // Check if any requests failed due to OAuth token expiration
      const oauthErrors = results.filter(result => 
        result.status === 'rejected' || 
        (result.status === 'fulfilled' && !result.value.ok)
      );
      
      if (oauthErrors.length > 0) {
        // Check if any of the errors are OAuth related
        for (const result of oauthErrors) {
          if (result.status === 'fulfilled') {
            try {
              const data = await result.value.json();
              if (data.requiresReauth || data.message?.includes('OAuth tokens have expired')) {
                addToast({
                  type: 'warning',
                  title: 'Authentication Required',
                  message: 'Your Google account access has expired. Please reconnect your Gmail account to continue.',
                  duration: 8000
                });
                window.location.href = '/auth/signin';
                return;
              }
            } catch {
              // Ignore JSON parsing errors
            }
          }
        }
      }
      
      // Count successful operations
      const successfulResults = results.filter(result => 
        result.status === 'fulfilled' && result.value.ok
      );
      
      // Clear all suggestions if any were processed
      if (successfulResults.length > 0) {
        setCleanupSuggestions(null);
        addToast({
          type: 'success',
          title: 'Bulk Cleanup Complete!',
          message: `Successfully processed ${successfulResults.length} emails!`
        });
      } else {
        addToast({
          type: 'warning',
          title: 'No Emails Processed',
          message: 'No emails were processed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error executing bulk cleanup:', error);
      addToast({
        type: 'error',
        title: 'Bulk Cleanup Failed',
        message: 'Error processing emails. Please try again.'
      });
    }
  };

  const handleDeleteAll = () => {
    if (!cleanupSuggestions || cleanupSuggestions.length === 0) return;
    
    // Show beautiful confirmation modal
    showModal({
      type: 'danger',
      title: 'Delete All Emails',
      message: `Are you sure you want to delete ${cleanupSuggestions.length} emails? This action cannot be undone.`,
      confirmText: 'Delete All',
      cancelText: 'Cancel',
      onConfirm: performBulkDelete
    });
  };

  const handleCleanupAction = (emailId: string, action: string) => {
    const actionText = action === 'archive' ? 'archive' : action === 'trash' ? 'move to trash' : 'delete';
    
    showModal({
      type: 'warning',
      title: `Confirm ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
      message: `Are you sure you want to ${actionText} this email?`,
      confirmText: action === 'archive' ? 'Archive' : action === 'trash' ? 'Move to Trash' : 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => performCleanupAction(emailId, action)
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/auth/signin' });
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback to window.location if signOut fails
      window.location.href = '/auth/signin';
    }
  };

  useEffect(() => {
    if (hasSynced) {
      loadCleanupSuggestions();
    }
  }, [hasSynced, loadCleanupSuggestions]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">EmailCleaner</h1>
          <p className="text-gray-600 mb-8">AI-powered inbox management</p>
          <Button onClick={() => window.location.href = '/auth/signin'}>
            Sign in to get started
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EmailCleaner</h1>
              <p className="text-gray-600">Keep your inbox clean with AI</p>
            </div>
                          <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{(user as User | null)?.email}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                >
                  Sign out
                </Button>
              </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* OAuth Expired Banner */}
        {hasSynced === false && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Gmail Connection Required</h3>
                <p className="text-sm text-yellow-700 mt-1">Connect your Gmail account to start using EmailCleaner</p>
              </div>
            </div>
          </div>
        )}
        {/* Connect Email Section */}
        {hasSynced === false && (
          <Card className="mb-8">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Connect Your Gmail</h2>
              <p className="text-gray-600 mb-6">Connect your Gmail account to start cleaning your inbox</p>
              <Button
                onClick={handleFirstSync}
                disabled={syncing}
                size="lg"
              >
                {syncing ? 'Connecting...' : 'Connect Gmail'}
              </Button>
            </div>
          </Card>
        )}

        {/* Cleanup Suggestions */}
        {hasSynced && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Cleanup Suggestions</h2>
                <p className="text-gray-600">AI-powered suggestions to clean your inbox</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={generateCleanupSuggestions}
                  disabled={generating}
                >
                  {generating ? 'Generating...' : 'Generate New'}
                </Button>
                {cleanupSuggestions && cleanupSuggestions.length > 0 && (
                  <>
                    <Button
                      variant="danger"
                      onClick={handleDeleteAll}
                      className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete All ({cleanupSuggestions.length})
                    </Button>
                    <Badge variant="primary">{cleanupSuggestions.length} pending</Badge>
                  </>
                )}
              </div>
            </div>

            {/* Loading State */}
            {cleanupLoading && (
              <Card>
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading suggestions...</p>
                </div>
              </Card>
            )}

            {/* Suggestions List */}
            {!cleanupLoading && cleanupSuggestions && cleanupSuggestions.length > 0 && (
              <div className="space-y-4">
                {cleanupSuggestions.map((suggestion) => (
                  <Card key={suggestion.emailId} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1 truncate">
                          {suggestion.subject || '(No Subject)'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">From: {suggestion.from}</p>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2 overflow-hidden">
                          {suggestion.snippet}
                        </p>
                        <p className="text-xs text-gray-400">
                          Reason: {suggestion.reason}
                        </p>
                      </div>
                      <div className="ml-4 flex flex-col gap-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => handleCleanupAction(suggestion.emailId, suggestion.suggestedAction)}
                            className="min-w-[80px] bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setCleanupSuggestions(prev => prev?.filter(s => s.emailId !== suggestion.emailId) || null);
                            }}
                            className="min-w-[80px] text-green-600 border-green-300 hover:bg-green-500 hover:border-green-500 hover:text-white hover:shadow-md transition-all duration-200"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Keep
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!cleanupLoading && (!cleanupSuggestions || cleanupSuggestions.length === 0) && (
              <Card>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No cleanup suggestions</h3>
                  <p className="text-gray-600 mb-4">Your inbox looks clean! Generate new suggestions to find more emails to clean up.</p>
                  <Button onClick={generateCleanupSuggestions} disabled={generating}>
                    {generating ? 'Generating...' : 'Generate Suggestions'}
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}