export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['History'],
      },
      {
        _name: 'CSidebarNavItem',
        name: 'Transactions',
        to: '/pages/transactionList',
        icon: 'cilFile'
      },
      
      {
        _name: 'CSidebarNavTitle',
        _children: ['Configuration']
      },
      {
        _name: 'CSidebarNavItem',
        name: 'User',
        to: '/pages/users',
        icon: 'cil-user'
      },
      


    ]
  }
]