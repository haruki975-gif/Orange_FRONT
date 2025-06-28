import axios from "axios";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";

const CreateTeamModal = ({setOpenModal, modalBackground, setUpdateTeamList, categories}) =>{

    const apiUrl = URL_CONFIG.API_URL;



    const [chooseCategory, setChooseCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    // Modal 닫기
    const closeCreateTeamModal = (e) =>{
        setOpenModal(false);
    }

    const errorAlert = (message) =>{
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    const successAlert = (message) =>{
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    // 팀생성 요청
    const createTeamHandler = () =>{
        
        if(!sessionStorage.getItem("userNo")){
            errorAlert("로그인 후 이용 가능합니다.");
            return;
        }
            const accessToken = sessionStorage.getItem("accessToken");

            if(title.trim() === "" || content.trim() === "" || chooseCategory.trim() === ""){
                errorAlert("모든 정보를 기입 해야합니다.");
            }

            axios.post(`${apiUrl}/api/teams`, {
                title : title,
                content : content,
                category : chooseCategory
            },
            {
                headers : {
                    Authorization : `Bearer ${accessToken}`,
                }
            }).then((response) =>{
                closeCreateTeamModal();
                setUpdateTeamList((prev => !prev))
                successAlert("팀이 생성되었습니다.");
            }).catch((error)=>{
                errorAlert(error.response.data.message);
                closeCreateTeamModal()
            })
        
    }

    return( 
        <div className="create-team-modal" ref={modalBackground} onClick={(e) => {
            if(modalBackground.current === e.target)
                closeCreateTeamModal(e);
        }}>
            <form className="container" onSubmit={(e) => {e.preventDefault(); createTeamHandler();}}>
                <h2 className="title">팀 생성</h2>
                <div className="team-name">
                    <label htmlFor="team-name" className="name">팀명</label>
                    <input type="text" id="team-name" placeholder="팀명(최대100자)" value={title}
                        onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="team-content">
                    <label htmlFor="team-content" className="content">팀 설명</label>
                    <textarea id="team-content" placeholder="팀설명 (최대 1000자)" value={content}
                        onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div className="team-category">
                    <h3>팀 카테고리</h3>
                    <div className="categories">
                        {categories.map((category, index) => (
                            <button type="button" key={index}
                                className={`category ${chooseCategory === category.key ? "active" : ""}`} 
                                onClick={() => setChooseCategory(category.key)}>
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button type="submit" className="create-request-btn">팀 생성</button>
                <button className="close-btn" type="button" onClick={() => closeCreateTeamModal()}>
                    <img src="/img/icon/x-lg.png" alt="" />
                </button>
            </form>
        </div>
    )
}

export default CreateTeamModal;