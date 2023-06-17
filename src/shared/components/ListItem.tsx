import React from 'react';
import { ListItemProps } from 'antd/es/list';

import { List } from 'antd';
interface IListItemProps {
  ListItemProps?: ListItemProps;
  lockedText: string;
  className: string;
  children: React.ReactNode;
  onClick: () => void;
}
function ListItem({ ListItemProps, lockedText, className, children, onClick }: IListItemProps) {
  return <List.Item {...ListItemProps}>{children}</List.Item>;
}

export default ListItem;
