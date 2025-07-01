'use client'
import Button from "@/components/Button";
import Card, { CardHeader, CardBody, CardFooter } from "@/components/Card";
import Badge from "@/components/Badge";
import Input from "@/components/Input";
import Avatar from "@/components/Avatar";
import Alert from "@/components/Alert";
import Modal from "@/components/Modal";
import Tooltip from "@/components/Tooltip";
import Spinner from "@/components/Spinner";
import Progress from "@/components/Progress";
import Tabs from "@/components/Tabs";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const tabContent = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-4">
          <p className="text-[var(--text-main)]">This is the overview tab content. Here you can see how tabs organize content into different sections.</p>
          <div className="flex gap-2">
            <Badge variant="primary">New</Badge>
            <Badge variant="success">Active</Badge>
          </div>
        </div>
      )
    },
    {
      id: 'details',
      label: 'Details',
      content: (
        <div className="space-y-4">
          <p className="text-[var(--text-main)]">Detailed information goes here. This tab shows more comprehensive content.</p>
          <Progress value={75} variant="accent" showLabel animated />
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div className="space-y-4">
          <p className="text-[var(--text-main)]">Settings and configuration options would be displayed here.</p>
          <Input label="Setting Name" placeholder="Enter setting value" fullWidth />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--text-main)] mb-8 text-center">
          Component Library
        </h1>
        
        {/* Buttons Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Buttons</h2>
          <Card variant="elevated" className="mb-6">
            <CardHeader>
              <h3 className="text-lg font-medium">Button Variants</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </CardBody>
          </Card>
          
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Button Sizes</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card variant="default">
              <CardHeader>
                <h3 className="text-lg font-medium">Default Card</h3>
                <p className="text-sm text-[var(--text-secondary)]">Simple card with header</p>
              </CardHeader>
              <CardBody>
                <p className="text-[var(--text-main)]">This is a default card with clean styling.</p>
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <h3 className="text-lg font-medium">Elevated Card</h3>
                <p className="text-sm text-[var(--text-secondary)]">With shadow and hover effects</p>
              </CardHeader>
              <CardBody>
                <p className="text-[var(--text-main)]">This card has elevation and hover animations.</p>
              </CardBody>
              <CardFooter>
                <Button variant="primary" size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <h3 className="text-lg font-medium">Outlined Card</h3>
                <p className="text-sm text-[var(--text-secondary)]">With border styling</p>
              </CardHeader>
              <CardBody>
                <p className="text-[var(--text-main)]">This card uses an outlined design.</p>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Badges</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Badge Variants</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="elevated">
              <CardHeader>
                <h3 className="text-lg font-medium">Input Examples</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input 
                  label="Email Address" 
                  type="email" 
                  placeholder="Enter your email"
                  fullWidth
                />
                <Input 
                  label="Password" 
                  type="password" 
                  placeholder="Enter your password"
                  fullWidth
                />
                <Input 
                  label="Username" 
                  placeholder="Enter username"
                  error={true}
                  helperText="Username is required"
                  fullWidth
                />
              </CardBody>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <h3 className="text-lg font-medium">Input Sizes</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <Input size="sm" placeholder="Small input" fullWidth />
                <Input size="md" placeholder="Medium input" fullWidth />
                <Input size="lg" placeholder="Large input" fullWidth />
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Select & Checkbox Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Select & Checkbox</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="elevated">
              <CardHeader>
                <h3 className="text-lg font-medium">Select Dropdown</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                {/* Select Example */}
                <Select
                  label="Favorite Fruit"
                  options={[
                    { value: 'apple', label: 'Apple' },
                    { value: 'banana', label: 'Banana' },
                    { value: 'orange', label: 'Orange' },
                    { value: 'grape', label: 'Grape' },
                    { value: 'mango', label: 'Mango' },
                  ]}
                  placeholder="Choose a fruit"
                  fullWidth
                />
                <Select
                  label="Disabled Select"
                  options={[
                    { value: 'one', label: 'One' },
                    { value: 'two', label: 'Two' },
                  ]}
                  disabled
                  fullWidth
                />
              </CardBody>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <h3 className="text-lg font-medium">Checkboxes</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                {/* Checkbox Example */}
                <Checkbox label="Accept Terms" />
                <Checkbox label="Subscribe to newsletter" checked />
                <Checkbox label="Indeterminate" indeterminate />
                <Checkbox label="Disabled" disabled />
                <Checkbox label="Required" required />
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Avatars Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Avatars</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Avatar Examples</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="sm" fallback="John Doe" />
                  <span className="text-sm text-[var(--text-secondary)]">Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="md" fallback="Jane Smith" />
                  <span className="text-sm text-[var(--text-secondary)]">Medium</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="lg" fallback="Bob Johnson" />
                  <span className="text-sm text-[var(--text-secondary)]">Large</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="xl" fallback="Alice Brown" />
                  <span className="text-sm text-[var(--text-secondary)]">Extra Large</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Alerts Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Alerts</h2>
          <div className="space-y-4">
            {isAlertVisible && (
              <Alert 
                type="info" 
                title="Information"
                onClose={() => setIsAlertVisible(false)}
              >
                This is an informational alert with some helpful content.
              </Alert>
            )}
            
            <Alert type="success" title="Success">
              Your action was completed successfully!
            </Alert>
            
            <Alert type="warning" title="Warning">
              Please review your input before proceeding.
            </Alert>
            
            <Alert type="danger" title="Error">
              Something went wrong. Please try again.
            </Alert>
          </div>
        </section>

        {/* Spinners Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Spinners</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Loading Spinners</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="sm" color="primary" />
                  <span className="text-sm text-[var(--text-secondary)]">Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="md" color="accent" />
                  <span className="text-sm text-[var(--text-secondary)]">Medium</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="lg" color="primary" />
                  <span className="text-sm text-[var(--text-secondary)]">Large</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="xl" color="accent" />
                  <span className="text-sm text-[var(--text-secondary)]">Extra Large</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Progress Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Progress Bars</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Progress Examples</h3>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Default Progress</h4>
                <Progress value={65} showLabel animated />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Different Variants</h4>
                <div className="space-y-3">
                  <Progress value={45} variant="primary" size="sm" />
                  <Progress value={75} variant="accent" size="md" />
                  <Progress value={90} variant="success" size="lg" />
                  <Progress value={30} variant="warning" />
                  <Progress value={15} variant="danger" />
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Tabs Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Tabs</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Tab Navigation</h3>
            </CardHeader>
            <CardBody>
              <Tabs tabs={tabContent} />
            </CardBody>
          </Card>
        </section>

        {/* Tooltips Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Tooltips</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Tooltip Examples</h3>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-4">
                <Tooltip content="This is a tooltip on top" position="top">
                  <Button variant="outline">Hover me (Top)</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip on bottom" position="bottom">
                  <Button variant="outline">Hover me (Bottom)</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip on left" position="left">
                  <Button variant="outline">Hover me (Left)</Button>
                </Tooltip>
                <Tooltip content="This is a tooltip on right" position="right">
                  <Button variant="outline">Hover me (Right)</Button>
                </Tooltip>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Modal Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Modal</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">Modal Example</h3>
            </CardHeader>
            <CardBody>
              <Button 
                variant="primary" 
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal
              </Button>
            </CardBody>
          </Card>
        </section>

        {/* Interactive Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[var(--text-main)] mb-6">Interactive Demo</h2>
          <Card variant="elevated">
            <CardHeader>
              <h3 className="text-lg font-medium">User Profile Card</h3>
            </CardHeader>
            <CardBody>
              <div className="flex items-start gap-4">
                <Avatar size="lg" fallback="Demo User" />
                <div className="flex-1">
                  <h4 className="font-medium text-[var(--text-main)]">Demo User</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3">demo@example.com</p>
                  <div className="flex gap-2 mb-4">
                    <Badge variant="primary">Admin</Badge>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <Input 
                    label="Update Bio" 
                    placeholder="Enter your bio"
                    fullWidth
                  />
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Save Changes</Button>
                <Button variant="outline" size="sm">Cancel</Button>
              </div>
            </CardFooter>
          </Card>
        </section>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-[var(--text-main)]">
            This is an example modal. You can put any content here including forms, 
            images, or other components.
          </p>
          <div className="flex gap-2">
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
