// <ListItemButton component={NavLink} to="/clienti">
//   Clienti
// </ListItemButton>

export interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}
