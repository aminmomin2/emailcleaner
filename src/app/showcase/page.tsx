'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import Switch from '@/components/ui/Switch';
import RadioGroup from '@/components/ui/RadioGroup';
import Card, { CardBody, CardFooter, CardHeader } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Tag from '@/components/ui/Tag';
import Avatar from '@/components/ui/Avatar';
import Alert from '@/components/ui/Alert';
import Progress from '@/components/ui/Progress';
import Spinner from '@/components/ui/Spinner';
import Modal from '@/components/ui/Modal';

import Tooltip from '@/components/ui/Tooltip';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Pagination from '@/components/ui/Pagination';
import Accordion from '@/components/ui/Accordion';
import Table from '@/components/ui/Table';
import Divider from '@/components/ui/Divider';
import Skeleton from '@/components/ui/Skeleton';
import List from '@/components/ui/List';

export default function ShowcasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState('buttons');

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const radioOptions = [
    { value: 'radio1', label: 'Radio Option 1' },
    { value: 'radio2', label: 'Radio Option 2' },
    { value: 'radio3', label: 'Radio Option 3' },
  ];

  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Showcase' },
  ];

  const accordionItems = [
    {
      id: '1',
      title: 'What is this component library?',
      content: 'This is a comprehensive UI component library built with React and Tailwind CSS. It provides a complete set of reusable components for building modern web applications.',
    },
    {
      id: '2',
      title: 'How to use these components?',
      content: 'Simply import the components you need and use them in your React components. All components are fully typed with TypeScript and customizable through props.',
    },
    {
      id: '3',
      title: 'Are these components accessible?',
      content: 'Yes! All components are built with accessibility in mind, including proper ARIA attributes, keyboard navigation, and screen reader support.',
    },
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];

  const tableData = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  ];

  const listItems = [
    { id: '1', content: 'First list item with some content' },
    { id: '2', content: 'Second list item with more content' },
    { id: '3', content: 'Third list item with even more content' },
  ];

  const showcaseTabs = [
    { id: 'buttons', label: 'Buttons & Forms', content: null },
    { id: 'display', label: 'Display', content: null },
    { id: 'feedback', label: 'Feedback', content: null },
    { id: 'navigation', label: 'Navigation', content: null },
    { id: 'data', label: 'Data Display', content: null },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Component Library Showcase
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive collection of UI components built with React and Tailwind CSS
          </p>
        </div>

        <div className="mb-8">
          <div className="border-b border-[var(--border)] mb-6">
            <nav className="flex space-x-8" role="tablist">
              {showcaseTabs.map((tab) => {
                const isActive = tab.id === selectedTab;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    className={`text-lg px-6 py-3 font-medium transition-colors duration-200 cursor-pointer border-b-2 ${
                      isActive 
                        ? 'border-[var(--accent)] text-[var(--accent)]' 
                        : 'border-transparent hover:border-[var(--border)] hover:text-[var(--text-main)]'
                    }`}
                    onClick={() => setSelectedTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {selectedTab === 'buttons' && (
          <div className="space-y-12">
            {/* Buttons Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Buttons</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="danger">Danger</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Button States</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button>Normal</Button>
                      <Button disabled>Disabled</Button>
                      <Button loading>Loading</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Form Components Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Form Components</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Input Fields</h3>
                  <div className="space-y-4">
                    <Input
                      label="Text Input"
                      placeholder="Enter some text..."
                      size="md"
                    />
                    <Input
                      label="Email Input"
                      type="email"
                      placeholder="Enter your email..."
                      error={true}
                      helperText="Please enter a valid email"
                    />
                    <Input
                      label="Disabled Input"
                      placeholder="This is disabled"
                      disabled
                    />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Textarea</h3>
                  <Textarea
                    label="Description"
                    placeholder="Enter a description..."
                    rows={4}
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Select Dropdown</h3>
                  <Select
                    label="Choose an option"
                    options={selectOptions}
                    placeholder="Select an option..."
                  />
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Checkboxes & Switches</h3>
                  <div className="space-y-4">
                    <Checkbox label="Accept terms and conditions" />
                    <Checkbox label="Subscribe to newsletter" />
                    <Divider />
                    <Switch label="Enable notifications" />
                    <Switch label="Dark mode" />
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Radio Group</h3>
                  <RadioGroup
                    name="example-radio"
                    options={radioOptions}
                    layout="vertical"
                  />
                </Card>
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'display' && (
          <div className="space-y-12">
            {/* Cards Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Card with Header</h3>
                  </CardHeader>
                  <CardBody>
                    <p className="text-gray-600">
                      This is a card with a header and body. You can add any content here.
                    </p>
                  </CardBody>
                  <CardFooter>
                    <Button size="sm">Action</Button>
                  </CardFooter>
                </Card>

                <Card variant="elevated">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-2">Elevated Card</h3>
                    <p className="text-gray-600">
                      This card has an elevated shadow for more prominence.
                    </p>
                  </CardBody>
                </Card>

                <Card variant="outlined">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-2">Outlined Card</h3>
                    <p className="text-gray-600">
                      This card has a subtle border outline.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </section>

            {/* Badges & Tags Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Badges & Tags</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Badges</h3>
                    <div className="flex flex-wrap gap-4">
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="outline">Secondary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="danger">Danger</Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-4">
                      <Tag color="blue">React</Tag>
                      <Tag color="green">TypeScript</Tag>
                      <Tag color="purple">Tailwind</Tag>
                      <Tag color="red" closable onClose={() => console.log('closed')}>
                        Removable
                      </Tag>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Avatar Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Avatars</h2>
              <Card className="p-6">
                <div className="flex flex-wrap items-center gap-6">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="User"
                    size="sm"
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="User"
                    size="md"
                  />
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="User"
                    size="lg"
                  />
                  <Avatar alt="John Doe" size="md" />
                  <Avatar alt="Jane Smith" size="md" />
                </div>
              </Card>
            </section>

            {/* List Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Lists</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Unordered List</h3>
                  <List items={listItems} variant="unordered" />
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Ordered List</h3>
                  <List items={listItems} variant="ordered" />
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">No Markers</h3>
                  <List items={listItems} variant="none" />
                </Card>
              </div>
            </section>
          </div>
        )}

        {selectedTab === 'feedback' && (
          <div className="space-y-12">
            {/* Alerts Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Alerts</h2>
              <div className="space-y-4">
                <Alert type="info" title="Information">
                  This is an informational alert with some important details.
                </Alert>
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

            {/* Progress & Spinner Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress & Loading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Progress Bars</h3>
                  <div className="space-y-4">
                    <Progress value={25} showLabel />
                    <Progress value={50} showLabel />
                    <Progress value={75} showLabel />
                    <Progress value={100} showLabel />
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Spinners</h3>
                  <div className="flex items-center gap-6">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                  </div>
                </Card>
              </div>
            </section>

            {/* Skeleton Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skeleton Loading</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="space-y-2 flex-1">
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="40%" />
                    </div>
                  </div>
                  <Skeleton variant="rectangular" height={100} />
                  <div className="space-y-2">
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" width="80%" />
                  </div>
                </div>
              </Card>
            </section>

            {/* Modal Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Modal</h2>
              <Card className="p-6">
                <Button onClick={() => setIsModalOpen(true)}>
                  Open Modal
                </Button>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Example Modal"
                >
                  <div className="space-y-4">
                    <p>This is an example modal with some content.</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                </Modal>
              </Card>
            </section>

            {/* Tooltip Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tooltips</h2>
              <Card className="p-6">
                <div className="flex flex-wrap gap-4">
                  <Tooltip content="This is a tooltip">
                    <Button variant="outline">Hover me</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip on the right" position="right">
                    <Button variant="outline">Right tooltip</Button>
                  </Tooltip>
                  <Tooltip content="Tooltip on the bottom" position="bottom">
                    <Button variant="outline">Bottom tooltip</Button>
                  </Tooltip>
                </div>
              </Card>
            </section>
          </div>
        )}

        {selectedTab === 'navigation' && (
          <div className="space-y-12">
            {/* Breadcrumb Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Breadcrumbs</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <Breadcrumb items={breadcrumbItems} separator="slash" />
                  <Breadcrumb items={breadcrumbItems} separator="chevron" />
                  <Breadcrumb items={breadcrumbItems} separator="arrow" />
                </div>
              </Card>
            </section>

            {/* Pagination Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pagination</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Default Pagination</h3>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={10}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Compact Pagination</h3>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={10}
                      onPageChange={setCurrentPage}
                      maxVisiblePages={3}
                    />
                  </div>
                </div>
              </Card>
            </section>

            {/* Divider Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dividers</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Horizontal Dividers</h3>
                    <div className="space-y-4">
                      <p>Content above</p>
                      <Divider />
                      <p>Content below</p>
                      <Divider variant="dashed" />
                      <p>Dashed divider</p>
                      <Divider variant="dotted" />
                      <p>Dotted divider</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dividers with Labels</h3>
                    <Divider label="Section Title" />
                    <Divider label="Another Section" labelPosition="left" />
                    <Divider label="Right Aligned" labelPosition="right" />
                  </div>
                </div>
              </Card>
            </section>
          </div>
        )}

        {selectedTab === 'data' && (
          <div className="space-y-12">
            {/* Table Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Tables</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Sortable Table</h3>
                    <Table
                      columns={tableColumns}
                      data={tableData}
                      sortable
                      striped
                      hoverable
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Bordered Table</h3>
                    <Table
                      columns={tableColumns}
                      data={tableData}
                      variant="bordered"
                      size="sm"
                    />
                  </div>
                </div>
              </Card>
            </section>

            {/* Accordion Section */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Accordion</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Single Open</h3>
                  <Accordion items={accordionItems} />
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Multiple Open</h3>
                  <Accordion
                    items={accordionItems}
                    allowMultiple
                    defaultOpen={['1']}
                  />
                </Card>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
} 