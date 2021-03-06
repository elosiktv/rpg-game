import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { setContextMenuInterface, WearableItem } from './payloadActionTypes';

interface IItemContextMenu {
    x: number;
    y: number;
    type: string;
    details: WearableItem;
}

const initialState: IItemContextMenu = {
    x: -9999,
    y: -9999,
    type: '',
    details: {
        type: "weapon",
        id: 0,
        equipment: false
    }
}

export const itemContextMenuSlice = createSlice({
    name: 'itemContextMenu',
    initialState,
    reducers: {
        setContextMenu: (state, action: PayloadAction<setContextMenuInterface>) => {
            const { x, y, type, details } = action.payload;
            
            state.x = x;
            state.y = y;
            state.type = type;
            state.details = details;
        },
        clearContextMenu: (state) => {
            state.x = -99999;
            state.y = -99999;
        }
    }
})

export const { setContextMenu, clearContextMenu } = itemContextMenuSlice.actions;

export const selectItemContextMenu = (state: RootState) => state.itemContextMenu;

export default itemContextMenuSlice.reducer;