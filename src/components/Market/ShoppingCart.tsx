import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { Button, InputNumber, List, Typography } from 'antd';
import styles from '@/styles/components/ShoppingCart.module.scss';
import { ICartItem, IIngredients, IPlayer, IStorage } from '@/types/PastryShop';

interface IShoppingCartProps {
  cart: ICartItem[];
  setCart: Dispatch<SetStateAction<ICartItem[]>>;
}

function ShoppingCart({ cart, setCart }: IShoppingCartProps) {
  const {
    Player,
    Storage,
    playerCash,
    setPlayerCash,
    setStorageIngredients,
    setUnlockedEquipment,
    unlockedEquipment,
    isMobile,
    tabHeight,
  }: {
    Player?: IPlayer;
    Storage?: IStorage;
    playerCash: number;
    setPlayerCash: Dispatch<SetStateAction<number>>;
    setStorageIngredients?: Dispatch<SetStateAction<IIngredients[]>>;
    setUnlockedEquipment?: Dispatch<SetStateAction<string[]>>;
    unlockedEquipment: string[];
    isMobile?: boolean;
    tabHeight?: number;
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
        const existingIngredient = Storage.ingredients.find((storageIngredient: IIngredients) => storageIngredient.name === purchasedIngredient.name);
        if (!existingIngredient) {
          setStorageIngredients([...Storage.ingredients, purchasedIngredient]);
          Storage.ingredients = [...Storage.ingredients, purchasedIngredient];
        } else {
          setStorageIngredients((prevState: IIngredients[]) => [...prevState]);
          existingIngredient.qty += 1;
        }
      });

    const purchasedEquipment: string[] = cart
      .filter((cartItem: ICartItem) => cartItem.category === 'Equipment')
      .map((cartItem: ICartItem) => cartItem.name);
    setUnlockedEquipment([...unlockedEquipment, ...purchasedEquipment]);

    setPlayerCash((prevState: number) => (prevState -= cartTotal));
    setCart([]);
    console.log('Checkout successful!');
    console.log('Stored Ingredients:', Storage.ingredients);
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
