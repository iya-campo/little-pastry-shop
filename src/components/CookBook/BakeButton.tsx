import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { Button, Row } from 'antd';

interface IBakeButtonProps {
  bakePastry: () => void;
  isBakeable: boolean;
}

function BakeButton({ bakePastry, isBakeable }: IBakeButtonProps) {
  const { isMobile }: { isMobile: boolean } = useContext(PastryShopContext);

  return (
    <Row style={{ display: 'flex', alignItems: 'flex-end', height: isMobile ? 'auto' : '10%' }}>
      <Button style={{ height: '45px', width: '100%' }} disabled={!isBakeable} onClick={bakePastry}>
        {isBakeable ? 'Bake!' : 'Incorrect recipe!'}
      </Button>
    </Row>
  );
}

export default BakeButton;
