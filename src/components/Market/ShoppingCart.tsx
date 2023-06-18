import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { ICartItem, IIngredients } from '@/types/PastryShop';
import { Button, InputNumber, List, Typography } from 'antd';

interface IShoppingCartProps {
  cart: ICartItem[];
  setCart: Dispatch<SetStateAction<ICartItem[]>>;
}

function ShoppingCart({ cart, setCart }: IShoppingCartProps) {
  const {
    playerCash,
    setPlayerCash,
    storageIngredients,
    setStorageIngredients,
    unlockedEquipment,
    setUnlockedEquipment,
    isMobile,
    tabHeight,
  }: {
    playerCash: number;
    setPlayerCash: Dispatch<SetStateAction<number>>;
    storageIngredients: IIngredients[];
    setStorageIngredients: Dispatch<SetStateAction<IIngredients[]>>;
    unlockedEquipment: string[];
    setUnlockedEquipment: Dispatch<SetStateAction<string[]>>;
    isMobile: boolean;
    tabHeight: number;
  } = useContext(PastryShopContext);

  const [cartTotal, setCartTotal] = useState<number>(0);

  useEffect(() => {
    let cartItemsPrice: number = 0;
    cart.map((cartItem: ICartItem) => (cartItemsPrice += cartItem.price * cartItem.qty));
    setCartTotal(cartItemsPrice);
  }, [cart]);

  const handleCartInput = (value: number, updatedCartItem: ICartItem) => {
    const existingCartItem = cart.find((cartItem: ICartItem) => cartItem.name === updatedCartItem.name);
    if (value !== 0) {
      existingCartItem.qty = value;
      setCart((prevState: ICartItem[]) => [...prevState]);
    } else {
      setCart(cart.filter((cartItem: ICartItem) => cartItem.name !== updatedCartItem.name));
    }
  };

  const checkoutCart = () => {
    cart
      .filter((cartItem: ICartItem) => cartItem.category === 'Ingredient')
      .map((cartItem: ICartItem) => {
        const purchasedIngredient: IIngredients = {
          name: cartItem.name,
          qty: cartItem.qty,
          category: cartItem.category,
        };
        const existingIngredient = storageIngredients.find((storageIngredient: IIngredients) => storageIngredient.name === purchasedIngredient.name);
        if (!existingIngredient) {
          setStorageIngredients((prevState: IIngredients[]) => [...prevState, purchasedIngredient]);
        } else {
          setStorageIngredients(
            storageIngredients.map((storageIngredients: IIngredients) =>
              storageIngredients.name === existingIngredient.name ? { ...storageIngredients, qty: storageIngredients.qty + 1 } : storageIngredients
            )
          );
        }
      });

    const purchasedEquipment: string[] = cart
      .filter((cartItem: ICartItem) => cartItem.category === 'Equipment')
      .map((cartItem: ICartItem) => cartItem.name);
    setUnlockedEquipment([...unlockedEquipment, ...purchasedEquipment]);

    setPlayerCash((prevState: number) => (prevState -= cartTotal));
    setCart([]);
    console.log('Checkout successful!');
    console.log('Stored Ingredients:', storageIngredients);
    console.log('Unlocked Equipment:', unlockedEquipment);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: isMobile ? '300px' : tabHeight }}>
      <Typography.Title level={4}>Shopping Cart</Typography.Title>
      <List
        size='small'
        style={{ marginBottom: '1rem', overflowY: 'auto' }}
        dataSource={cart}
        renderItem={(cartItem: ICartItem) => (
          <List.Item onClick={() => {}}>
            <Typography.Text>{`${cartItem.name} - $ ${cartItem.price * cartItem.qty}`}</Typography.Text>
            <InputNumber
              min={0}
              max={cartItem.category === 'Equipment' ? 1 : 99}
              value={cartItem.qty}
              defaultValue={1}
              onChange={(e) => {
                handleCartInput(e, cartItem);
              }}
              style={{ width: '60px' }}
            />
          </List.Item>
        )}
      />
      <Button style={{ width: '100%' }} onClick={checkoutCart} disabled={playerCash === 0 || playerCash < cartTotal}>
        {`Purchase ($ ${cartTotal})`}
      </Button>
    </section>
  );
}

export default ShoppingCart;
