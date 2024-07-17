<script>
export default {
  name: 'nav',
  computed: { 
    sidebarItems () {
      return [{
        _name: 'CSidebarNav',
        _children: [{
            _name: 'CSidebarNavItem',
            name: this.$t('menu.dashboard'),
            to: '/dashboard',
            icon: 'cil-speedometer',
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Info',
            to: '/settings',
            icon: 'cil-notes'
          },
          {
            _name: 'CSidebarNavItem',
            name: 'Equipments',
            to: '/equipments/EquipmentList',
            icon: 'cil-cursor'
          },
          // {
          //   _name: 'CSidebarNavItem',
          //   name: 'Camera',
          //   to: '/cameras',
          //   icon: 'cil-puzzle'
          // },
          {
            _name: 'CSidebarNavItem',
            name: 'User',
            to: '/users',
            icon: 'cil-user'
          },
          
        ]
      }]
    }
  }
}
</script>
