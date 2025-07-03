'use client'
import React, { useState } from 'react'
import Tabs from '@/components/ui/Tabs'
import Card, { CardHeader, CardBody, CardFooter } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Alert from '@/components/ui/Alert'
import Container from '@/components/ui/Container'

// Types for workflows
interface Workflow {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  lastRun?: string
  nextRun?: string
  trigger: string
  steps: string[]
}

// Mock data for workflows
const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Monthly Expense Report Submission',
    description: 'Automatically collect and submit monthly expense reports',
    status: 'active',
    lastRun: '2024-01-15 09:00 AM',
    nextRun: '2024-02-15 09:00 AM',
    trigger: 'Monthly on 15th',
    steps: ['Collect receipts from email', 'Categorize expenses', 'Generate report', 'Submit to manager']
  },
  {
    id: '2',
    name: 'New Client Onboarding Sequence',
    description: 'Welcome new clients with automated onboarding emails and setup',
    status: 'active',
    lastRun: '2024-01-20 02:30 PM',
    nextRun: 'Triggered by new client signup',
    trigger: 'New client registration',
    steps: ['Send welcome email', 'Create client folder', 'Schedule intro call', 'Send onboarding materials']
  },
  {
    id: '3',
    name: 'Weekly Team Status Update',
    description: 'Collect and compile weekly team status updates',
    status: 'inactive',
    lastRun: '2024-01-12 05:00 PM',
    nextRun: 'Disabled',
    trigger: 'Weekly on Fridays',
    steps: ['Send reminder to team', 'Collect responses', 'Compile report', 'Send to stakeholders']
  }
]

const PreferencesAndRulesPage = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null)
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: '',
    steps: ['']
  })

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

  const handleWorkflowToggle = (workflowId: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
        : w
    ))
  }

  const handleCreateWorkflow = () => {
    const workflow: Workflow = {
      id: Date.now().toString(),
      name: newWorkflow.name,
      description: newWorkflow.description,
      status: 'active',
      trigger: newWorkflow.trigger,
      steps: newWorkflow.steps.filter(step => step.trim() !== ''),
      lastRun: undefined,
      nextRun: 'Pending first run'
    }
    setWorkflows(prev => [...prev, workflow])
    setShowCreateModal(false)
    setNewWorkflow({ name: '', description: '', trigger: '', steps: [''] })
  }

  const addWorkflowStep = () => {
    setNewWorkflow(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }))
  }

  const updateWorkflowStep = (index: number, value: string) => {
    setNewWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => i === index ? value : step)
    }))
  }

  const removeWorkflowStep = (index: number) => {
    setNewWorkflow(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }))
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
                    onChange={(value) => setAiSettings(prev => ({ ...prev, tone: value }))}
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
                    onChange={(value) => setAiSettings(prev => ({ ...prev, responseTime: value }))}
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
                    onChange={(checked) => setAiSettings(prev => ({ ...prev, autoSummarize: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Proactive suggestions</h4>
                    <p className="text-xs text-gray-500">AI suggests actions based on your patterns and preferences</p>
                  </div>
                  <Switch
                    checked={aiSettings.proactiveSuggestions}
                    onChange={(checked) => setAiSettings(prev => ({ ...prev, proactiveSuggestions: checked }))}
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
                    onChange={(checked) => setEmailSettings(prev => ({ ...prev, autoArchiveNewsletters: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Auto-reply when out of office</h4>
                    <p className="text-xs text-gray-500">Send automatic responses during out-of-office periods</p>
                  </div>
                  <Switch
                    checked={emailSettings.autoReplyOutOfOffice}
                    onChange={(checked) => setEmailSettings(prev => ({ ...prev, autoReplyOutOfOffice: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Smart categorization</h4>
                    <p className="text-xs text-gray-500">Automatically categorize emails based on content and sender</p>
                  </div>
                  <Switch
                    checked={emailSettings.smartCategorization}
                    onChange={(checked) => setEmailSettings(prev => ({ ...prev, smartCategorization: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Priority inbox</h4>
                    <p className="text-xs text-gray-500">Highlight important emails based on sender and content</p>
                  </div>
                  <Switch
                    checked={emailSettings.priorityInbox}
                    onChange={(checked) => setEmailSettings(prev => ({ ...prev, priorityInbox: checked }))}
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
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, autoReplyTemplate: e.target.value }))}
                    placeholder="Enter your out-of-office message..."
                    rows={3}
                  />
                </div>
              )}
            </CardBody>
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
                    onChange={(checked) => setCalendarSettings(prev => ({ ...prev, autoAcceptInternal: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Auto-decline conflicts</h4>
                    <p className="text-xs text-gray-500">Automatically decline meetings that conflict with existing ones</p>
                  </div>
                  <Switch
                    checked={calendarSettings.autoDeclineConflicts}
                    onChange={(checked) => setCalendarSettings(prev => ({ ...prev, autoDeclineConflicts: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Smart time blocking</h4>
                    <p className="text-xs text-gray-500">Automatically block time for focused work based on your patterns</p>
                  </div>
                  <Switch
                    checked={calendarSettings.smartTimeBlocking}
                    onChange={(checked) => setCalendarSettings(prev => ({ ...prev, smartTimeBlocking: checked }))}
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
                    onChange={(e) => setCalendarSettings(prev => ({ ...prev, bufferTime: e.target.value }))}
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours Start
                  </label>
                  <Input
                    type="time"
                    value={calendarSettings.workingHours.start}
                    onChange={(e) => setCalendarSettings(prev => ({ 
                      ...prev, 
                      workingHours: { ...prev.workingHours, start: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Hours End
                  </label>
                  <Input
                    type="time"
                    value={calendarSettings.workingHours.end}
                    onChange={(e) => setCalendarSettings(prev => ({ 
                      ...prev, 
                      workingHours: { ...prev.workingHours, end: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )
    },
    {
      id: 'workflows',
      label: 'Automated Workflows',
      content: (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Automated Workflows & Recurring Processes</h2>
              <p className="text-sm text-gray-600">Teach AI to perform complex, repeated tasks without constant oversight</p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              variant="primary"
            >
              Create New Workflow
            </Button>
          </div>

          <div className="grid gap-4">
            {workflows.map((workflow) => (
              <Card key={workflow.id} variant="elevated">
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                        <Badge 
                          variant={workflow.status === 'active' ? 'success' : 'secondary'}
                          size="sm"
                        >
                          {workflow.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Trigger:</span>
                          <p className="text-gray-600">{workflow.trigger}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Last Run:</span>
                          <p className="text-gray-600">{workflow.lastRun || 'Never'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Next Run:</span>
                          <p className="text-gray-600">{workflow.nextRun}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <span className="text-sm font-medium text-gray-700">Steps:</span>
                        <ul className="mt-1 space-y-1">
                          {workflow.steps.map((step, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      <Switch
                        checked={workflow.status === 'active'}
                        onChange={() => handleWorkflowToggle(workflow.id)}
                        label="Enable"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedWorkflow(workflow)
                          // Here you would open edit modal
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedWorkflow(workflow)
                          setShowHistoryModal(true)
                        }}
                      >
                        View History
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )
    }
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

      {/* Create Workflow Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Workflow"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workflow Name
            </label>
            <Input
              value={newWorkflow.name}
              onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Monthly Expense Report Submission"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={newWorkflow.description}
              onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this workflow does..."
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trigger
            </label>
            <Select
              value={newWorkflow.trigger}
              onChange={(value) => setNewWorkflow(prev => ({ ...prev, trigger: value }))}
              options={[
                { value: 'monthly', label: 'Monthly' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'daily', label: 'Daily' },
                { value: 'new-client', label: 'New Client Registration' },
                { value: 'email-received', label: 'Email Received' },
                { value: 'manual', label: 'Manual Trigger' }
              ]}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workflow Steps
            </label>
            <div className="space-y-2">
              {newWorkflow.steps.map((step, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={step}
                    onChange={(e) => updateWorkflowStep(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                  />
                  {newWorkflow.steps.length > 1 && (
                    <Button
                      variant="danger"
                      size="icon"
                      onClick={() => removeWorkflowStep(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addWorkflowStep}
              >
                Add Step
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="secondary"
            onClick={() => setShowCreateModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateWorkflow}
            disabled={!newWorkflow.name || !newWorkflow.description || !newWorkflow.trigger}
          >
            Create Workflow
          </Button>
        </div>
      </Modal>

      {/* Workflow History Modal */}
      <Modal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        title={`Workflow History - ${selectedWorkflow?.name}`}
        size="lg"
      >
        <div className="space-y-4">
          <Alert variant="info">
            <p>This feature would show detailed logs of workflow executions, including success/failure status, timestamps, and any errors encountered.</p>
          </Alert>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Sample History Entries</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span>2024-01-15 09:00 AM</span>
                <Badge variant="success" size="sm">Success</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>2024-01-08 09:00 AM</span>
                <Badge variant="success" size="sm">Success</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>2024-01-01 09:00 AM</span>
                <Badge variant="danger" size="sm">Failed</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button
            variant="secondary"
            onClick={() => setShowHistoryModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </Container>
  )
}

export default PreferencesAndRulesPage