import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { Button, Row } from 'antd';

function BakeButton() {
  const { isMobile }: { isMobile?: boolean } = useContext(PastryShopContext);

  return (
    <Row style={{ height: isMobile ? 'auto' : '10%' }}>
      <Button style={{ height: '100%', width: '100%' }}>Bake!</Button>
    </Row>
  );
}

export default BakeButton;
