import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/store";
import { addItem, removeItem, deleteItem } from "store/cartSlice";

const Cart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = useSelector(
        (state: RootState) => state.cart.totalQuantity
    );
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const dispatch = useDispatch();

    return (
        <div>
            <h2>ショッピングカート</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.quantity} x ${item.price} = $
                        {item.totalPrice}
                        <button onClick={() => dispatch(removeItem(item.id))}>
                            -xxxxxxxxxxxxxx
                        </button>
                        <button onClick={() => dispatch(addItem(item))}>
                            +xxxxxxxxxxxx
                        </button>
                        <button onClick={() => dispatch(deleteItem(item.id))}>
                            削除xxxxxxxxxxxxx
                        </button>
                    </li>
                ))}
            </ul>
            <div>
                <h3>合計数量: {totalQuantity}</h3>
                <h3>合計金額: ${totalPrice}</h3>
            </div>
        </div>
    );
};

export default Cart;
