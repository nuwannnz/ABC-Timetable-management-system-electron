/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.css';
import {
  SideBarMenuItem,
  SideBarMenuItemList,
} from '../../constants/SideBarMenuItems';

const Title = (): JSX.Element => (
  <div className={styles.titleContainer}>
    <h5>ABC Timetable Management</h5>
  </div>
);

type SideBarMenuItemProp = {
  menuItem: SideBarMenuItem;
  isChildItem: boolean;
  selectedIndex: number;
  onSelect: (index: number) => void;
};
const SideBarMenuItemElement = ({
  menuItem,
  isChildItem = false,
  selectedIndex,
  onSelect,
}: SideBarMenuItemProp): JSX.Element => {
  const [active, setActive] = useState(false);
  const [selectedChildIndex, setSelectedChildIndex] = useState(-1);
  const linkRef = useRef(null);

  useEffect(() => {
    if (selectedIndex !== menuItem.index) {
      setActive(false);
      setSelectedChildIndex(-1);
    }
  }, [selectedIndex]);

  const handleLinkClick = () => {
    if (linkRef === null || linkRef.current === null) {
      return;
    }
    if (active) {
      return;
    }

    if (!menuItem.childrenMenuItems) {
      (linkRef as any).current.click();
    }
    setActive(true);
    onSelect(menuItem.index);
    setSelectedChildIndex(menuItem.index);
  };

  return (
    <div
      className={`${styles.sideBarMenuItemContainer} ${
        active
          ? isChildItem
            ? styles.sideBarSubMenuItemActive
            : styles.sideBarMenuItemActive
          : styles.notActive
      }`}
      onClick={handleLinkClick}
    >
      <Link ref={linkRef} to={menuItem.childrenMenuItems ? '#' : menuItem.link}>
        <div
          className={styles.sideBarMenuItem}
          onClick={() => handleLinkClick()}
          onKeyPress={() => {}}
          role="link"
          tabIndex={menuItem.index}
        >
          <div className="d-flex w-100 justify-content-between align-items-center">
            <span>
              {menuItem.rootLevelContent
                ? menuItem.rootLevelContent
                : menuItem.content}
            </span>
            {menuItem.childrenMenuItems && (
              <i className="fas fa-chevron-down">
                <></>
              </i>
            )}
          </div>
        </div>
      </Link>
      {menuItem.childrenMenuItems && active && (
        <div className={styles.sideBarMenuItemChildWrapper}>
          {menuItem.childrenMenuItems
            .concat(
              ...[
                {
                  ...menuItem,
                  childrenMenuItems: undefined,
                  rootLevelContent: undefined,
                },
              ]
            )
            .reverse()
            .map((m) => (
              <SideBarMenuItemElement
                key={m.index}
                menuItem={m}
                isChildItem
                selectedIndex={selectedChildIndex}
                onSelect={(i) => {
                  setSelectedChildIndex(i);
                }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <div className={styles.sidebarContainer}>
      <Title />
      {SideBarMenuItemList.map((m) => (
        <SideBarMenuItemElement
          key={m.index}
          menuItem={m}
          isChildItem={false}
          selectedIndex={selectedIndex}
          onSelect={(i) => setSelectedIndex(i)}
        />
      ))}
    </div>
  );
}
