import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import '../styles/Nav.scss'
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const Navbar = () => {
  // list of menus
  const menuLists = [
    { title: 'Home' },
    {
      title: 'Categories',
      submenus: [
        {
          title: 'Flavours',
          submenus: [{ title: 'Vanilla' }, { title: 'Chocolate' }],
        },
        {
          title: 'Occasions',
          submenus: [{ title: 'Aniversary' }, { title: 'Valentines Day' }],
        },
      ],
    },
  ]
  const ListMenu = ({ submenus }) => {
    const [subMenuOpen, setSubMenuOpen] = useState(false)
    const [menuSelected, setMenuSelected] = useState()
    let count = 0

    return submenus.map((menu, index) => (
      <li key={index}>
        <a
          href
          onClick={() => {
            menu.title === menuSelected
              ? setSubMenuOpen(!subMenuOpen)
              : setSubMenuOpen(true)

            setMenuSelected(menu.title)
          }}
        >
          {menu.title}
          <span id='indicator'>
            {menu.submenus ? (
              <FontAwesomeIcon
                icon={subMenuOpen ? faChevronUp : faChevronDown}
              />
            ) : (
              ''
            )}
          </span>
        </a>
        <ul className='dropdown_2'>
          {subMenuOpen && menu.submenus && menu.title === menuSelected ? (
            <ListMenu submenus={menu.submenus} />
          ) : (
            ''
          )}
        </ul>
      </li>
    ))
  }
  // function containing parent lists
  const ParentMenu = ({ menu, index }) => {
    const [navOpen, setNavOpen] = useState(false)
    return (
      <ul className='menu-container'>
        <li>
          <a href onClick={() => setNavOpen(!navOpen)}>
            {menu.title}
            {menu.submenus ? (
              <FontAwesomeIcon
                icon={navOpen ? faAngleDoubleUp : faAngleDoubleDown}
              />
            ) : (
              ''
            )}
          </a>
          <ul className='dropdown_1'>
            {navOpen && menu.submenus ? (
              <ListMenu submenus={menu.submenus} />
            ) : (
              ''
            )}
          </ul>
        </li>
      </ul>
    )
  }
  return (
    <nav>
      <div className='logo-container'>
        <FontAwesomeIcon icon={faReact} className='logo' />
      </div>
      <ul className='menu-container'>
        {menuLists.map((menu, index) => (
          <ParentMenu menu={menu} key={index} />
        ))}
      </ul>
    </nav>
  )
}
export default Navbar
