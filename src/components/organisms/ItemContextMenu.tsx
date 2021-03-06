import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectItemContextMenu } from '../../features/itemContextMenu/itemContextMenuSlice';
import { equipItem, takeOffItem, selectPlayer, giveItems, takeMoneyAway, removeItem, giveMoney } from '../../features/player/playerSlice';
import { healPlayer } from '../../features/global/globalSlice';
import returnItemData from '../../helpers/returnItemData';
import { potions } from '../../assets/items/items';

interface IContainer {
    left: number;
    top: number;
}

const Container = styled.div<IContainer>`
    width: 130px;
    background: #000;
    position: absolute;
    left: ${({left}) => left}px;
    top: ${({top}) => top}px;
    z-index: 1;
    user-select: none;
`

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0px;
    width: 100%;
`

const Item = styled.li`
    width: 100%;
`

const Button = styled.button`
    width: 100%;
    background: none;
    color: #fff;
    border: none;
    font-size: 18px;
    text-transform: uppercase;
    height: 40px;
    cursor: pointer;
    outline: none;

    &:hover {
        background: #222;
    }
`

const ItemContextMenu = () => {
    const dispatch = useDispatch();
    const itemContextMenuSelector = useSelector(selectItemContextMenu);
    const playerSelector = useSelector(selectPlayer);

    const handleUseButton = (equip: boolean) => {
        if (equip) {
            dispatch(takeOffItem(itemContextMenuSelector.details.type));
        } else {
            dispatch(equipItem(itemContextMenuSelector.details.id));
        }
    }

    const handleBuy = (id: number, type: string) => {
        let itemData = returnItemData(id, type);
        
        if (itemData) {
            if (playerSelector.money - itemData.buyMoney >= 0) {
                if (playerSelector.inventoryItemsNumber < 20) {
                    console.log(playerSelector.inventoryItemsNumber);
                    dispatch(giveItems({id: id, type: type}));
                    dispatch(takeMoneyAway(itemData.buyMoney));
                }
            }
        }

    }

    const handleSell = (id: number, type: string) => {
        if (playerSelector.inventory[id]) {
            const itemData = returnItemData(playerSelector.inventory[id]!.id, type);
        
            dispatch(removeItem(id));
            dispatch(giveMoney(itemData!.sellMoney));
        }
    }

    const handlePotion = (id: number, type: string) => {
        if (playerSelector.inventory[id]) {
            dispatch(healPlayer({
                cost: 0,
                healAmount: potions[playerSelector.inventory[id]!.id].heal,
                money: playerSelector.money,
                hp: playerSelector.hp,
                maxHP: playerSelector.maxHP
            }));
            dispatch(removeItem(id));
        }
    }

    return (
        <Container left={itemContextMenuSelector.x} top={itemContextMenuSelector.y}>
            <List>
                {
                    itemContextMenuSelector.type === "buy" && (
                        <Item>
                            <Button onClick={() => handleBuy(itemContextMenuSelector.details.id, itemContextMenuSelector.details.type)}>Buy</Button>
                        </Item>
                    )
                }
                {
                    itemContextMenuSelector.type === 'wearable' && (
                        <Item>
                            <Button onClick={() => handleUseButton(itemContextMenuSelector.details.equipment)}>{itemContextMenuSelector.details.equipment ? 'Take off' : 'Use'}</Button>
                        </Item>
                    )
                }
                {
                    itemContextMenuSelector.type === 'potion' && (
                        <Item>
                            <Button onClick={() => handlePotion(itemContextMenuSelector.details.id, itemContextMenuSelector.details.type)}>Use</Button>
                        </Item>
                    )
                }
                {
                    itemContextMenuSelector.type === 'sell' && (
                        <Item>
                            <Button onClick={() => handleSell(itemContextMenuSelector.details.id, itemContextMenuSelector.details.type)}>Sell</Button>
                        </Item>
                    )
                }
            </List>
        </Container>
    );
};

export default ItemContextMenu;