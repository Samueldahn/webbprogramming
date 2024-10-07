import { useEffect } from 'react';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ConfirmOrder({ confirmations }) {
    useEffect(() => {
        const toastElList = document.querySelectorAll('.toast');
        toastElList.forEach(toastEl => {
            const toast = new bootstrap.Toast(toastEl);
            toast.show(); 
        });
    }, [confirmations]);

    if (!confirmations || confirmations.length === 0) {
        return <div></div>;
    }

    return (
        <div className="container">
            {confirmations.map((confirmation, index) => (
                <div key={index} className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
                    <div className="toast-header">
                        <strong className="me-auto">Order Confirmation</strong>
                        <small>{new Date(confirmation.timestamp).toLocaleTimeString()}</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        Status: {confirmation.status}<br />
                        Order ID: {confirmation.uuid}<br />
                        Price: {confirmation.price} kr<br />
                        Order: {confirmation.order.join(', ')}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ConfirmOrder;
