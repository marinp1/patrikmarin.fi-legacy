import * as React from 'react';
import glamorous from 'glamorous';

const Container = glamorous.nav({
  width: '100%',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  marginTop: '3rem',
  position: 'sticky',
  top: '2rem',
  color: '#000',
});

const NavItem = glamorous.ul({
  display: 'inline-block',
  margin: '0 1rem',
  cursor: 'pointer',
});

const MenuComponent = () => (
  <Container>
    <NavItem>Resume</NavItem>
    <NavItem>Projects</NavItem>
    <NavItem>Photographs</NavItem>
  </Container>
);

export default MenuComponent;
