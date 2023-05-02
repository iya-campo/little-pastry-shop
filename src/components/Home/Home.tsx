import React, { useContext, useEffect, useState } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import PlayerLevel from './PlayerLevel';
import { Layout, Row, Col, Divider, Button, Typography } from 'antd';
import styles from '@/styles/components/Home.module.scss';

function Home() {
  const { isMobile }: { isMobile?: boolean } = useContext(PastryShopContext);

  return (
    <Layout.Content style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Title level={2}>Home Sweet Home</Typography.Title>
      <Row style={{ flexGrow: 1 }}>
        <Col span={isMobile ? 24 : 8}>
          <PlayerLevel />
        </Col>
        <Col span={isMobile ? 24 : 16} style={{ display: 'flex', flexDirection: 'column', paddingLeft: isMobile ? 0 : '2rem' }}>
          <section style={{ flexGrow: 1 }}>
            <Divider plain orientation='left'>
              <Typography.Title level={5} style={{ fontWeight: 600, marginRight: '4px' }}>
                Pastries Baked
              </Typography.Title>
            </Divider>
          </section>
          <section style={{ flexGrow: 1 }}>
            <Divider plain orientation='left'>
              <Typography.Title level={5} style={{ fontWeight: 600, marginRight: '4px' }}>
                Equipment Unlocked
              </Typography.Title>
            </Divider>
          </section>
          <Button style={{ width: '100%' }}>End Day</Button>
        </Col>
      </Row>
    </Layout.Content>
  );
}

export default Home;
