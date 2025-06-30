import { useEffect, useState } from "react";
import Modal from "./Modal";
import "./Modal.css";

const ModalForm = ({ isOpen, setIsOpen, title, fields, onSubmit, submitText = "확인" }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const initialData = {};
        fields.forEach((field) => {
            initialData[field.name] = "";
        });
        setFormData(initialData);
    }, [fields]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const isValid = fields.every((f) => formData[f.name]);
        if (!isValid) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        onSubmit(formData);
        setIsOpen(false);
    };


    return isOpen ? (
        <Modal setOpenModal={setIsOpen}>
            <h2>{title}</h2>
            <br />
            {fields.map((field) =>
    field.type === "textarea" ? (
        <div className="field-block" key={field.name}>
            <label>{field.label}</label>
            <textarea
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
            />
        </div>
    ) : (
        <div className="field-block" key={field.name}>
            <label>{field.label}</label>
            <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
            />
        </div>
    )
)}
<button className="submit-btn" onClick={handleSubmit}>
    {submitText}
</button>
        </Modal>
    ) : null;
};

export default ModalForm;