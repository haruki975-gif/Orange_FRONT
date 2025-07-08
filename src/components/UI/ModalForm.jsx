import { useEffect, useState } from "react";
import Modal from "./Modal";
import "./Modal.css";

const ModalForm = ({ isOpen, setIsOpen, title, fields, onSubmit, submitText = "확인" }) => {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (!fields || fields.length === 0) return;
        const initialData = {};
        fields.forEach((field) => {
            initialData[field.name] = "";
        });
        setFormData(initialData);
    }, [fields]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = () => {
        const isValid = fields.every((f) => formData[f.name] && formData[f.name].trim() !== "");
        if (!isValid) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        onSubmit(formData);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
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
                            value={formData[field.name] ?? ""}
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
                            value={formData[field.name] ?? ""}
                            onChange={handleChange}
                        />
                    </div>
                )
            )}

            {/* ✅ 첨부파일 필드 추가 */}
            <div className="field-block">
                <label>첨부파일</label>
                <input
                    type="file"
                    name="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                />
            </div>

            <button className="submit-btn" onClick={handleSubmit}>
                {submitText}
            </button>
        </Modal>
    );
};

export default ModalForm;