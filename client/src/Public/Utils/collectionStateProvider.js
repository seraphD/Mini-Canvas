import React, {useReducer, createContext, useContext} from "react";

const CollectionStateContext = createContext();

export default function CollectionStateProvider({ children, collectionListReducer, initialCollectionState }) {
    const [state, dispatch] = useReducer(
        collectionListReducer,
        initialCollectionState
    );
    return (
        <CollectionStateContext.Provider value={[state, dispatch]}>
            {children}
        </CollectionStateContext.Provider>
    );
}

export const useCollectionState = () => useContext(CollectionStateContext);