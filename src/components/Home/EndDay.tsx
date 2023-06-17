import React, { Dispatch, SetStateAction, useContext } from 'react';
import PastryShopContext from '@/contexts/PastryShopContext';
import { IPlayer, IBakedGoods, IEndDayModal } from '@/types/PastryShop';
import { Modal, Typography } from 'antd';
import styles from '@/styles/components/Home.module.scss';

interface IEndDay {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  modalData: IEndDayModal;
  setModalData: Dispatch<SetStateAction<IEndDayModal>>;
  totalExpGained: number;
  setTotalExpGained: Dispatch<SetStateAction<number>>;
}

function EndDay({ isModalOpen, setIsModalOpen, modalData, setModalData, totalExpGained, setTotalExpGained }: IEndDay) {
  const { Player, playerCash, playerRep, playerCurrentExp }: { Player: IPlayer; playerCash: number; playerRep: number; playerCurrentExp: number } =
    useContext(PastryShopContext);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setModalData({ pastriesSold: [], cashEarned: 0, repEarned: 0 });
    setTotalExpGained(0);
  };

  return (
    <>
      <Modal title={`Day ${Player.daysPlayed} Summary`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Typography.Text style={{ display: 'block', marginTop: '1rem' }}>
          <strong>Pastries Sold</strong>
        </Typography.Text>
        {modalData.pastriesSold.length > 0 ? (
          modalData.pastriesSold.map((pastrySold: IBakedGoods, index: number) => (
            <p key={index}>{`${pastrySold.quality} ${pastrySold.name} x ${pastrySold.qty}`}</p>
          ))
        ) : (
          <p>No pastries sold.</p>
        )}
        <Typography.Text style={{ display: 'block', marginTop: '1rem' }}>
          <strong>Shop Earnings</strong>
        </Typography.Text>
        <p>{`Cash: $ ${playerCash} (+${modalData.cashEarned})`}</p>
        <p>{`Reputation: ${playerRep} ${playerRep === 1000 ? `(MAX)` : `(+${modalData.repEarned})`}`}</p>
        <br />
        <p>{`You gained a total of ${totalExpGained} exp for the day. Current exp: ${playerCurrentExp}`}</p>
      </Modal>
    </>
  );
}

export default EndDay;
