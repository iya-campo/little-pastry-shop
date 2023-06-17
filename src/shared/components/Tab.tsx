import React, { ReactNode } from 'react';
import styles from '@/styles/components/Tab.module.scss';
import { Col, Row } from 'antd';

interface ITabProps {
  isMobile: boolean;
  image: string;
  component: ReactNode;
}

function Tab({ isMobile, image, component }: ITabProps) {
  return (
    <div style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
      <Row className={styles.tabRow} style={{ height: `${isMobile ? 'auto' : '100%'}` }}>
        <Col
          className={styles.tabCol}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
          style={{ backgroundImage: `url(images/${image})`, backgroundSize: 'cover', height: `${isMobile ? '100px' : '100%'}` }}
        />
        <Col className={styles.tabCol} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 18 }} xl={{ span: 18 }}>
          {component}
        </Col>
      </Row>
    </div>
  );
}

export default Tab;
