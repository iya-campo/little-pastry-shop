import React, { useState, useEffect } from 'react';
import styles from '@/styles/components/Tab.module.scss';
import { Col, Row } from 'antd';

function Tab(props: any) {
  return (
    <div style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
      <Row className={styles.tabRow} style={{ height: `${props.isMobile ? 'auto' : '100%'}` }}>
        <Col
          className={styles.tabCol}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 6 }}
          lg={{ span: 6 }}
          xl={{ span: 6 }}
          style={{ backgroundImage: `url(images/${props.image})`, backgroundSize: 'cover', height: `${props.isMobile ? '100px' : '100%'}` }}
        />
        <Col className={styles.tabCol} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 18 }} lg={{ span: 18 }} xl={{ span: 18 }}>
          {props.component}
        </Col>
      </Row>
    </div>
  );
}

export default Tab;
