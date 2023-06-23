export default [
  { heading: 'Apps & Pages' },

  // {
  //   title: 'Email',
  //   icon: { icon: 'tabler-mail' },
  //   to: 'apps-email',
  // },
  {
    title: 'Chat',
    icon: { icon: 'tabler-message-circle' },
    to: 'apps-chat',
  },
  {
    title: 'Calendar',
    icon: { icon: 'tabler-calendar' },
    to: 'apps-calendar',
  },
  {
    title: 'Course',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-course-list' },
      { title: 'Add', to: 'apps-course-add' },
      {
        title: 'Lesson',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-lesson-list' },
          { title: 'Add', to: 'apps-lesson-add' },
        ],
      },
      {
        title: 'Categories',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-categories-list' },
          { title: 'Add', to: 'apps-categories-add' },
        ],
      },

      {
        title: 'Company',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-company-list' },
          { title: 'Add', to: 'apps-company-add' },
        ],
      },
      {
        title: 'Assignment',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-assignment-list' },
          { title: 'Add', to: 'apps-assignment-add' },
        ],
      },
    ],
  },
  {
    title: 'Blog',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-blog-list' },
      { title: 'Add', to: 'apps-blog-add' },
      {
        title: 'Category',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-category-blog-list' },
          { title: 'Add', to: 'apps-category-blog-add' },
        ],
      },
       {
        title: 'Event',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-event-list' },
          { title: 'Add', to: 'apps-event-add' },
        ],
      },

    ],
  },
  {
    title: 'Ebook',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-ebook-list' },
      { title: 'Add', to: 'apps-ebook-add' },
      {
        title: 'Category',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-category-ebook-list' },
          { title: 'Add', to: 'apps-category-ebook-add' },
        ],
      },
      {
        title: 'Author',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-author-list' },
          { title: 'Add', to: 'apps-author-add' },
        ],
      },

    ],
  },
  {
    title: 'Level',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-level-list' },
      { title: 'Add', to: 'apps-level-add' },
    ],
  },
  {
    title: 'Quiz',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-quiz-list' },
      { title: 'Add', to: 'apps-quiz-add' },
      {
        title: 'Question',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-question-list' },
          { title: 'Add', to: 'apps-question-add' },
        ],
      },
      // {
      //   title: 'Author',
      //   icon: { icon: 'tabler-calendar' },

      //   children: [
      //     { title: 'List', to: 'apps-author-list' },
      //     { title: 'Add', to: 'apps-author-add' },
      //   ],
      // },

    ],
  },
  {
    title: 'Tag',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-tag-list' },
      { title: 'Add', to: 'apps-tag-add' },
      {
        title: 'Course',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-question-list' },
          { title: 'Add', to: 'apps-question-add' },
        ],
      },
      // {
      //   title: 'Author',
      //   icon: { icon: 'tabler-calendar' },

      //   children: [
      //     { title: 'List', to: 'apps-author-list' },
      //     { title: 'Add', to: 'apps-author-add' },
      //   ],
      // },

    ],
  },
  {
    title: 'Info',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-info-list' },
      // { title: 'Add', to: 'apps-tag-add' },
      {
        title: 'Section',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-section-list' },
          { title: 'Add', to: 'apps-section-add' },
        ],
      },
      {
        title: 'Setting',
        icon: { icon: 'tabler-calendar' },

        children: [
          { title: 'List', to: 'apps-setting-list' },
          { title: 'Add', to: 'apps-setting-add' },
        ],
      },

    ],
  },
  {
    title: 'BootCamp',
    icon: { icon: 'tabler-calendar' },

    children: [
      { title: 'List', to: 'apps-bootcamp-list' },
      { title: 'Add', to: 'apps-bootcamp-add' },
    ]
    },
  // {
  //   title: 'Invoice',
  //   icon: { icon: 'tabler-file-dollar' },

  //   children: [
  //     { title: 'List', to: 'apps-invoice-list' },
  //     { title: 'Preview', to: { name: 'apps-invoice-preview-id', params: { id: '5036' } } },
  //     { title: 'Edit', to: { name: 'apps-invoice-edit-id', params: { id: '5036' } } },
  //     { title: 'Add', to: 'apps-invoice-add' },
  //   ],
  // },


  {
    title: 'KeyWord',
    icon: { icon: 'tabler-settings' },
    children: [
      { title: 'Add', to: 'apps-keyword-add' },
      { title: 'List', to: 'apps-keyword-list' },
    ],
  },
  {
    title: 'User',
    icon: { icon: 'tabler-users' },
    children: [
      { title: 'List', to: 'apps-user-list' },
      { title: 'View', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Roles & Permissions',
    icon: { icon: 'tabler-settings' },
    children: [
      { title: 'Roles', to: 'apps-roles' },
      { title: 'Permissions', to: 'apps-permissions' },
    ],
  },

  // {
  //   title: 'Pages',
  //   icon: { icon: 'tabler-file' },
  //   children: [
  //     { title: 'Help Center', to: 'pages-help-center' },
  //     { title: 'User Profile', to: { name: 'pages-user-profile-tab', params: { tab: 'profile' } } },
  //     { title: 'Account Settings', to: { name: 'pages-account-settings-tab', params: { tab: 'account' } } },
  //     { title: 'Pricing', to: 'pages-pricing' },
  //     { title: 'FAQ', to: 'pages-faq' },
  //     {
  //       title: 'Miscellaneous',
  //       children: [
  //         { title: 'Coming Soon', to: 'pages-misc-coming-soon', target: '_blank' },
  //         { title: 'Under Maintenance', to: 'pages-misc-under-maintenance', target: '_blank' },
  //         { title: 'Page Not Found - 404', to: 'pages-misc-not-found', target: '_blank' },
  //         { title: 'Not Authorized - 401', to: 'pages-misc-not-authorized', target: '_blank' },
  //         { title: 'Server Error - 500', to: 'pages-misc-internal-server-error', target: '_blank' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Authentication',
  //   icon: { icon: 'tabler-lock' },
  //   children: [
  //     {
  //       title: 'Login',
  //       children: [
  //         { title: 'Login v1', to: 'pages-authentication-login-v1', target: '_blank' },
  //         { title: 'Login v2', to: 'pages-authentication-login-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Register',
  //       children: [
  //         { title: 'Register v1', to: 'pages-authentication-register-v1', target: '_blank' },
  //         { title: 'Register v2', to: 'pages-authentication-register-v2', target: '_blank' },
  //         { title: 'Register Multi-Steps', to: 'pages-authentication-register-multi-steps', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Verify Email',
  //       children: [
  //         { title: 'Verify Email v1', to: 'pages-authentication-verify-email-v1', target: '_blank' },
  //         { title: 'Verify Email v2', to: 'pages-authentication-verify-email-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Forgot Password',
  //       children: [
  //         { title: 'Forgot Password v1', to: 'pages-authentication-forgot-password-v1', target: '_blank' },
  //         { title: 'Forgot Password v2', to: 'pages-authentication-forgot-password-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Reset Password',
  //       children: [
  //         { title: 'Reset Password v1', to: 'pages-authentication-reset-password-v1', target: '_blank' },
  //         { title: 'Reset Password v2', to: 'pages-authentication-reset-password-v2', target: '_blank' },
  //       ],
  //     },
  //     {
  //       title: 'Two Steps',
  //       children: [
  //         { title: 'Two Steps v1', to: 'pages-authentication-two-steps-v1', target: '_blank' },
  //         { title: 'Two Steps v2', to: 'pages-authentication-two-steps-v2', target: '_blank' },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: 'Wizard Examples',
  //   icon: { icon: 'tabler-forms' },
  //   children: [
  //     { title: 'Checkout', to: { name: 'wizard-examples-checkout' } },
  //     { title: 'Property Listing', to: { name: 'wizard-examples-property-listing' } },
  //     { title: 'Create Deal', to: { name: 'wizard-examples-create-deal' } },
  //   ],
  // },
  // {
  //   title: 'Dialog Examples',
  //   icon: { icon: 'tabler-square' },
  //   to: 'pages-dialog-examples',
  // },
]