import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Bakery from '@/components/Bakery/Bakery';
import CookBook from '@/components/CookBook/CookBook';
import Grocery from '@/components/Grocery/Grocery';
import Home from '@/components/Home/Home';
import Tab from '@/shared/components/Tab';
import PastryShopContext from '@/contexts/PastryShopContext';
import { ConfigProvider, Layout, Tabs, TabsProps, Typography } from 'antd';
import styles from '@/styles/index.module.scss';
import Player from '@/data/Player';
import Storage from '@/data/Storage';
import Recipes from '@/data/Recipes';
import Items from '@/data/Items';
import pastryShopTheme from '@/themes/PastryShopTheme';

export default function Index() {
  const [isMobile, setIsMobile] = useState(false);
  const [tabHeight, setTabHeight] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const onChange = (key: string) => {};

  const tabs: TabsProps['items'] = [
    {
      key: '1',
      label: `Home`,
      children: <Tab component={<Home />} image={'home.jpg'} isMobile={isMobile} />,
    },
    {
      key: '2',
      label: `Bakery`,
      children: <Tab component={<Bakery />} image={'bakery.jpg'} isMobile={isMobile} />,
    },
    {
      key: '3',
      label: `Cook Book`,
      children: <Tab component={<CookBook />} image={'cookbook.jpg'} isMobile={isMobile} />,
    },
    {
      key: '4',
      label: `Grocery`,
      children: <Tab component={<Grocery />} image={'grocery.jpg'} isMobile={isMobile} />,
    },
  ];

  return (
    <ConfigProvider theme={pastryShopTheme}>
      <Head>
        <title>Little Pastry Shop</title>
        <meta name='a bakery management mini-game about a little pastry shop.' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='icons/cupcake.png' />
      </Head>
      <main>
        <Layout style={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
          <Layout.Header className={styles.header}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              Little Pastry Shop
            </Typography.Title>
          </Layout.Header>
          <Layout.Content className={styles.content}>
            <PastryShopContext.Provider value={{ Player, Storage, Recipes, Items, isMobile, tabHeight, setTabHeight }}>
              <Tabs
                defaultActiveKey='1'
                items={tabs}
                centered
                onChange={onChange}
                size='large'
                style={{ maxWidth: '1200px', height: isMobile ? 'auto' : '575px', flexGrow: 1 }}
                className={styles.tabs}
              />
            </PastryShopContext.Provider>
          </Layout.Content>
        </Layout>
      </main>
    </ConfigProvider>
  );
}
