import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FeedbackPage = () => {
    const [form, setForm] = useState({
        // email: "",
        // first_name: "",
        // last_name: "",
        // message: "",
        // service_id: 1
        full_name: "",
        addres: "",
        message: "",
        service_id: 1,
        email: "",
    });

    const [services, setServices] = useState([]);

    const fetchServices = async() => {
        const response = await fetch('https://exam.avavion.ru/api/services');
        
        const data = await response.json();

        setServices(data.data);
    }

    useEffect(() => {
        fetchServices();
    }, []);



    const onChangeForm = (event) => {
        setForm((prevState) => {
            prevState = {...prevState};

            prevState[event.target.name] = event.target.value.trim();

            return prevState;
        });
    }

    const onSubmitHandle = (event) => {
        event.preventDefault();
    }

    const sendRequest = async (body) => {
        const response = await fetch('https://exam.avavion.ru/api/requests/create', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.status) {
            return Swal.fire({
                icon: 'success',
                title: data.message
            });
        }

        return Swal.fire({
            icon: 'error',
            title: data.message
        });
    }

    const onClickHandle = (event) => {
        event.preventDefault();

        sendRequest(form);
    }

    const onChangeSelectForm = (event) => {
        setForm((prevState) => {
            prevState = {...prevState};

            prevState[event.target.name] = event.target.options[event.target.selectedIndex].value;

            return prevState;
        });
    }

    
    return(
        <div className="feedback_container">
            <div className="feedback_box-container container">
                <div className="feedback_text-box">
                    <h1>Подписка на рассылку</h1>
                    <form onSubmit={onSubmitHandle.bind(this)} className="feedback_actions">
                        <input 
                            onChange={onChangeForm.bind(this)}
                            value={form.full_name} 
                            type="text" 
                            name="full_name" 
                            id="full_name"
                            placeholder="fullname..." 
                            className="search-box_input" />
                        <input 
                            onChange={onChangeForm.bind(this)}
                            value={form.address} 
                            type="text" 
                            name="address" 
                            id="address"
                            placeholder="address..." 
                            className="search-box_input" />
                        <input 
                            onChange={onChangeForm.bind(this)}
                            value={form.message} 
                            type="text" 
                            name="message" 
                            id="message"
                            placeholder="message..." 
                            className="search-box_input" />
                        <div className="search-box">
                            <input 
                            onChange={onChangeForm.bind(this)}
                            value={form.email} 
                            type="email" 
                            name="email" 
                            id="email"
                            placeholder="email..." 
                            className="search-box_input" />
                        </div>
                        
                        <button onClick={onClickHandle.bind(this)} className="button-style">Отправить</button>
                    </form>
                </div>
            </div>
            <span className="darken_img"></span>
            <img src="public/products/Rectangle 4.png" alt="" className="feedback_bg" />
        </div>
    );
}

export default FeedbackPage;