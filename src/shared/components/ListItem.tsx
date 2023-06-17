import React from 'react';
import { ListItemProps } from 'antd/es/list';
import { List } from 'antd';

function ListItem(props: Omit<ListItemProps, 'lockedtext'> & React.RefAttributes<HTMLElement> & { lockedtext?: string }) {
  return <List.Item {...(props as ListItemProps)} />;
}

export default ListItem;
