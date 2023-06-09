import React, { useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IIngredients, IRecipes } from '@/types/PastryShop';
import { Row, Col, Typography, Image } from 'antd';

interface IRecipeInfoProps {
  pastryInfo: IRecipes;
}

function RecipeInfo({ pastryInfo }: IRecipeInfoProps) {
  const { isMobile }: { isMobile: boolean } = useContext(PastryShopContext);

  return (
    <>
      {pastryInfo && pastryInfo.name ? (
        <Row style={{ height: isMobile ? 'auto' : '30%' }}>
          <Col span={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image alt='pastry img' src={`/icons/recipes/${pastryInfo.image}`} width={64} height={64} preview={false}></Image>
          </Col>
          <Col span={16} style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Title level={4}>{pastryInfo.name}</Typography.Title>
            <section>
              <Typography.Text style={{ fontWeight: '500', marginRight: '8px' }}>Ingredients:</Typography.Text>
              <Typography.Text>
                {pastryInfo.ingredients.map(
                  (ingredient: IIngredients, index: number) => `${ingredient.name}${index === pastryInfo.ingredients.length - 1 ? '' : ', '}`
                )}
              </Typography.Text>
            </section>
            <section>
              <Typography.Text style={{ fontWeight: '500', marginRight: '8px' }}>Require(s):</Typography.Text>
              <Typography.Text>
                {pastryInfo.equipment.map(
                  (equipment: string, index: number) => `${equipment}${index === pastryInfo.equipment.length - 1 ? '' : ', '}`
                )}
              </Typography.Text>
            </section>
          </Col>
        </Row>
      ) : (
        <div style={{ height: isMobile ? 'auto' : '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography.Text>No pastry selected.</Typography.Text>
        </div>
      )}
    </>
  );
}

export default RecipeInfo;
