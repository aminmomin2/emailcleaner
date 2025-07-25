'use client'
import React, { useState, useEffect } from 'react'
import Tabs from '@/components/ui/Tabs'
import Card, { CardHeader, CardBody } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Container from '@/components/ui/Container'

const PreferencesAndRulesPage = () => {
  // General AI Behavior settings
  const [aiSettings, setAiSettings] = useState({
    tone: 'professional',
    communicationChannels: ['email', 'slack'],
    responseTime: 'within-4-hours',
    autoSummarize: true,
    proactiveSuggestions: true
  })

  // Email Automation settings
  const [emailSettings, setEmailSettings] = useState({
    autoArchiveNewsletters: true,
    autoReplyOutOfOffice: true,
    autoReplyTemplate: 'I am currently out of the office and will respond when I return.',
    smartCategorization: true,
    priorityInbox: true
  })

  // Calendar Automation settings
  const [calendarSettings, setCalendarSettings] = useState({
    autoAcceptInternal: true,
    autoDeclineConflicts: true,
    smartTimeBlocking: true,
    bufferTime: '15',
    workingHours: {
      start: '09:00',
      end: '17:00'
    }
  })

  // Email Cleaner Preferences state
  const [unwantedSenders, setUnwantedSenders] = useState<string[]>([]);
  const [newSender, setNewSender] = useState('');
  const [cleanOlderThan, setCleanOlderThan] = useState<string>('');

  // Backend preferences integration
  // (loadingPrefs, savingPrefs, saveStatus are not used in UI, so removed to fix linter)

  // Helper: Map backend prefs to UI state
  function applyPrefsToState(prefs: Record<string, string>) {
    // General AI
    setAiSettings({
      tone: prefs['ai_default_tone'] || 'professional',
      communicationChannels: ['email', 'slack'], // Not in backend yet
      responseTime: prefs['ai_response_time_expectation'] || 'within-4-hours',
      autoSummarize: prefs['auto_summarize_long_messages_enabled'] === 'true',
      proactiveSuggestions: prefs['proactive_suggestions_enabled'] === 'true',
    });
    // Email
    setEmailSettings({
      autoArchiveNewsletters: prefs['email_auto_categorize_enabled'] === 'true',
      autoReplyOutOfOffice: prefs['email_auto_reply_ooo_enabled'] === 'true',
      autoReplyTemplate: prefs['email_auto_reply_ooo_template'] || '',
      smartCategorization: prefs['email_auto_categorize_enabled'] === 'true',
      priorityInbox: prefs['email_priority_inbox_enabled'] === 'true',
    });
    // Email Cleaner
    setUnwantedSenders(prefs['email_cleaner_unwanted_senders'] ? JSON.parse(prefs['email_cleaner_unwanted_senders']) : []);
    setCleanOlderThan(prefs['email_cleaner_old_email_days'] || '');
    // Calendar
    setCalendarSettings({
      autoAcceptInternal: prefs['calendar_auto_accept_internal_enabled'] === 'true',
      autoDeclineConflicts: prefs['calendar_auto_decline_conflicts_enabled'] === 'true',
      smartTimeBlocking: prefs['calendar_smart_time_blocking_enabled'] === 'true',
      bufferTime: prefs['calendar_buffer_time_minutes'] || '15',
      workingHours: {
        start: prefs['calendar_working_hours_start'] || '09:00',
        end: prefs['calendar_working_hours_end'] || '17:00',
      },
    });
  }

  // Fetch preferences on mount
  useEffect(() => {
    // setLoadingPrefs(true); // Removed as per edit hint
    fetch('/api/user/preferences')
      .then(res => res.json())
      .then(data => {
        const prefs: Record<string, string> = {};
        (data.preferences || []).forEach((p: {preferenceKey: string, preferenceValue: string}) => {
          prefs[p.preferenceKey] = p.preferenceValue;
        });
        applyPrefsToState(prefs);
        // setLoadingPrefs(false); // Removed as per edit hint
      })
      .catch(() => {
        // setLoadingPrefs(false); // Removed as per edit hint
      });
  }, []);

  // Helper: Save a preference
  async function savePref(key: string, value: string) {
    // setSavingPrefs(true); // Removed as per edit hint
    // setSaveStatus(null); // Removed as per edit hint
    try {
      const res = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error('Failed to save');
      // setSaveStatus('Saved!'); // Removed as per edit hint
    } catch {
      // setSaveStatus('Error saving'); // Removed as per edit hint
    } finally {
      // setSavingPrefs(false); // Removed as per edit hint
      // setTimeout(() => setSaveStatus(null), 2000); // Removed as per edit hint
    }
  }

  const tabs = [
    {
      id: 'general',
      label: 'General AI Behavior',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Communication Preferences</h3>
              <p className="text-sm text-gray-600">Configure how AI should communicate with you</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Tone
                  </label>
                  <Select
                    value={aiSettings.tone}
                    onChange={(value) => {
                      setAiSettings(prev => ({ ...prev, tone: value }));
                      savePref('ai_default_tone', value);
                    }}
                    options={[
                      { value: 'professional', label: 'Professional' },
                      { value: 'casual', label: 'Casual' },
                      { value: 'friendly', label: 'Friendly' },
                      { value: 'formal', label: 'Formal' }
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Time Expectation
                  </label>
                  <Select
                    value={aiSettings.responseTime}
                    onChange={(value) => {
                      setAiSettings(prev => ({ ...prev, responseTime: value }));
                      savePref('ai_response_time_expectation', value);
                    }}
                    options={[
                      { value: 'immediate', label: 'Immediate' },
                      { value: 'within-1-hour', label: 'Within 1 hour' },
                      { value: 'within-4-hours', label: 'Within 4 hours' },
                      { value: 'within-24-hours', label: 'Within 24 hours' }
                    ]}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Auto-summarize long messages</h4>
                    <p className="text-xs text-gray-500">Automatically create summaries for messages longer than 500 words</p>
                  </div>
                  <Switch
                    checked={aiSettings.autoSummarize}
                    onChange={(checked) => {
                      setAiSettings(prev => ({ ...prev, autoSummarize: checked }));
                      savePref('auto_summarize_long_messages_enabled', checked.toString());
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Proactive suggestions</h4>
                    <p className="text-xs text-gray-500">AI suggests actions based on your patterns and preferences</p>
                  </div>
                  <Switch
                    checked={aiSettings.proactiveSuggestions}
                    onChange={(checked) => {
                      setAiSettings(prev => ({ ...prev, proactiveSuggestions: checked }));
                      savePref('proactive_suggestions_enabled', checked.toString());
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )
    },
    {
      id: 'email',
      label: 'Email Automation Rules',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Email Management</h3>
              <p className="text-sm text-gray-600">Automate common email tasks and responses</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Auto-archive newsletters</h4>
                    <p className="text-xs text-gray-500">Automatically move newsletter emails to archive</p>
                  </div>
                  <Switch
                    checked={emailSettings.autoArchiveNewsletters}
                    onChange={(checked) => {
                      setEmailSettings(prev => ({ ...prev, autoArchiveNewsletters: checked }));
                      savePref('email_auto_categorize_enabled', checked.toString());
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Auto-reply when out of office</h4>
                    <p className="text-xs text-gray-500">Send automatic responses during out-of-office periods</p>
                  </div>
                  <Switch
                    checked={emailSettings.autoReplyOutOfOffice}
                    onChange={(checked) => {
                      setEmailSettings(prev => ({ ...prev, autoReplyOutOfOffice: checked }));
                      savePref('email_auto_reply_ooo_enabled', checked.toString());
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Smart categorization</h4>
                    <p className="text-xs text-gray-500">Automatically categorize emails based on content and sender</p>
                  </div>
                  <Switch
                    checked={emailSettings.smartCategorization}
                    onChange={(checked) => {
                      setEmailSettings(prev => ({ ...prev, smartCategorization: checked }));
                      savePref('email_auto_categorize_enabled', checked.toString());
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Priority inbox</h4>
                    <p className="text-xs text-gray-500">Highlight important emails based on sender and content</p>
                  </div>
                  <Switch
                    checked={emailSettings.priorityInbox}
                    onChange={(checked) => {
                      setEmailSettings(prev => ({ ...prev, priorityInbox: checked }));
                      savePref('email_priority_inbox_enabled', checked.toString());
                    }}
                  />
                </div>
              </div>
              
              {emailSettings.autoReplyOutOfOffice && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-reply Template
                  </label>
                  <Textarea
                    value={emailSettings.autoReplyTemplate}
                    onChange={(value: string) => {
                      setEmailSettings(prev => ({ ...prev, autoReplyTemplate: value }));
                      savePref('email_auto_reply_ooo_template', value);
                    }}
                    placeholder="Enter your out-of-office message..."
                    rows={3}
                  />
                </div>
              )}
            </CardBody>
          </Card>

          {/* Email Cleaner Preferences Section */}
          <Card variant="elevated" padding="md" className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Email Cleaner Preferences</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Unwanted Senders</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSender}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSender(e.target.value)}
                  placeholder="Add email or domain"
                  className="w-64"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    if (newSender && !unwantedSenders.includes(newSender)) {
                      setUnwantedSenders([...unwantedSenders, newSender]);
                      setNewSender('');
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {unwantedSenders.map(sender => (
                  <span key={sender} className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center">
                    {sender}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1"
                      onClick={() => setUnwantedSenders(prev => prev.filter(s => s !== sender))}
                    >
                      ×
                    </Button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Clean Up Older Than (days)</label>
              <Input
                type="number"
                value={cleanOlderThan}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCleanOlderThan(e.target.value);
                  savePref('email_cleaner_old_email_days', e.target.value);
                }}
                className="w-32"
                placeholder="e.g. 90"
              />
            </div>
            <div className="mb-2">
              <label className="block font-medium mb-1">Auto-clean (requires review)</label>
              <span className="text-sm text-[var(--text-secondary)]">Coming soon</span>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'calendar',
      label: 'Calendar Automation Rules',
      content: (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Calendar Management</h3>
              <p className="text-sm text-gray-600">Automate calendar scheduling and time management</p>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Auto-accept internal meetings</h4>
                    <p className="text-xs text-gray-500">Automatically accept meetings from team members</p>
                  </div>
                  <Switch
                    checked={calendarSettings.autoAcceptInternal}
                    onChange={(checked) => {
                      setCalendarSettings(prev => ({ ...prev, autoAcceptInternal: checked }));
                      savePref('calendar_auto_accept_internal_enabled', checked.toString());
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Auto-decline conflicts</h4>
                    <p className="text-xs text-gray-500">Automatically decline meetings that conflict with existing ones</p>
                  </div>
                  <Switch
                    checked={calendarSettings.autoDeclineConflicts}
                    onChange={(checked) => {
                      setCalendarSettings(prev => ({ ...prev, autoDeclineConflicts: checked }));
                      savePref('calendar_auto_decline_conflicts_enabled', checked.toString());
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Smart time blocking</h4>
                    <p className="text-xs text-gray-500">Automatically block time for focused work based on your patterns</p>
                  </div>
                  <Switch
                    checked={calendarSettings.smartTimeBlocking}
                    onChange={(checked) => {
                      setCalendarSettings(prev => ({ ...prev, smartTimeBlocking: checked }));
                      savePref('calendar_smart_time_blocking_enabled', checked.toString());
                    }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buffer Time (minutes)
                  </label>
                  <Input
                    type="number"
                    value={calendarSettings.bufferTime}
                    onChange={(e) => {
                      setCalendarSettings(prev => ({ ...prev, bufferTime: e.target.value }));
                      savePref('calendar_buffer_time_minutes', e.target.value);
                    }}
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours Start
                  </label>
                  <Input
                    type="text"
                    value={calendarSettings.workingHours.start}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCalendarSettings(prev => ({ 
                        ...prev, 
                        workingHours: { ...prev.workingHours, start: e.target.value }
                      }));
                      savePref('calendar_working_hours_start', e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours End
                  </label>
                  <Input
                    type="text"
                    value={calendarSettings.workingHours.end}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCalendarSettings(prev => ({ 
                        ...prev, 
                        workingHours: { ...prev.workingHours, end: e.target.value }
                      }));
                      savePref('calendar_working_hours_end', e.target.value);
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )
    },
    // (No workflows tab)
  ]

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Preferences & Rules</h1>
        <p className="text-gray-600 mt-2">
          Configure how AI should behave and automate your workflows
        </p>
      </div>

      <Tabs tabs={tabs} defaultTab="general"/>
    </Container>
  )
}

export default PreferencesAndRulesPage