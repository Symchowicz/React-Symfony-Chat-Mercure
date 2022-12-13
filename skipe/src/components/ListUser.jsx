import {CheckIcon, MagnifyingGlassIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";


export default function ListUser(props) {
    const handleMessage = (e) => {
        const data = JSON.parse(e.data)
        document.querySelector('h1').insertAdjacentHTML('afterend', '<div class="alert alert-success w-75 mx-auto">'+data.message.content+'!</div>');
        window.setTimeout(() => {
            const $alert = document.querySelector('.alert');
            $alert.parentNode.removeChild($alert);
        }, 2000);
        console.log(JSON.parse(e.data));
    }

    const handleReceiver = (e) => {
        console.log(e.currentTarget.id)
        props.setUserFor(e.currentTarget.id);
    }

    return (
        <div className="list-user">
            {/* Profil */}
            <div className="profil">
                <div className="pp">
                    <img src="./person.jpeg" />
                    <span>
                        <CheckIcon />
                    </span>
                </div>
                <div>
                    <span>Francis huster</span>
                    <span>Online</span>
                </div>
            </div>

            {/* Barre de recherche */}
            <div className="search">
                <MagnifyingGlassIcon />
                <input placeholder="Search Skype" />
            </div>

            {/* Liste des amis */}
            <div className="user-list">
                {props.userList.map((user) => (
                <div onClick={handleReceiver} id={user.id}>
                    <UserCircleIcon />
                    <div>
                        <span>{user.username}</span>
                        <span>Ceci est le dernier message</span>
                    </div>
                    <span>06:21 PM</span>
                </div>
                ))}
            </div>
        </div>
    )
}