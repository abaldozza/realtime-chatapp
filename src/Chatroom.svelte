<script>
    import { db } from "./firebase";
    import { collection, query, orderBy, addDoc } from "firebase/firestore";
    import { collectionData } from "rxfire/firestore";
    import { startWith } from "rxjs/operators";

    export let user;
    export let logout;

    let message = "";

    const chatsCollection = collection(db, "chats");
    const chatsQuery = query(chatsCollection, orderBy("sentAt"));
    const chats = collectionData(chatsQuery, { idField: "id" }).pipe(
        startWith([]),
    );

    // Function to send a message
    async function sendMessage() {
        if (message.trim()) {
            await addDoc(chatsCollection, {
                uid: user.uid,
                message: message.trim(),
                avatar: user.photoURL,
                sentAt: new Date().getTime(),
            });
            message = "";
        }
    }
</script>

<main>
    <div class="header">
        <div class="logo">Chatroom</div>
        <button on:click={logout}>Logout</button>
    </div>
    <div class="messages">
        {#each $chats as chat}
            {#if user.uid == chat.uid}
                <div class="message my-message">
                    <div class="text">
                        {chat.message}
                    </div>
                </div>
            {:else}
                <div class="message other-message">
                    <div class="avatar">
                        <img src={chat.avatar} />
                    </div>
                    <div class="text">
                        {chat.message}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    <div class="form">
        <input type="text" bind:value={message} />
        <button on:click={sendMessage}>
            <i class="fa fa-paper-plane"></i>
        </button>
    </div>
</main>

<style>
    main {
        height: 100%;
    }

    .header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px;
        border-bottom: 1px solid #ddd;
    }
    .header .logo {
        font-size: 15px;
        font-weight: 600;
        color: #111;
    }
    .header button {
        background: transparent;
        padding: 5px 10px;
        border: 1px solid #ddd;
        color: #555;
        font-size: 15px;
        cursor: pointer;
    }
    .form {
        display: flex;
        width: 100%;
        height: 40px;
        border-top: 1px solid #ddd;
    }
    .form input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        color: #111;
        padding: 10px;
    }
    .form button {
        padding: 10px;
        font-size: 20px;
        color: #555;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
    }
    .messages {
        width: 100%;
        height: calc(100% - 90px);
        padding: 10px;
        overflow-y: auto;
    }
    .messages::-webkit-scrollbar {
        width: 4px;
        background: #fff;
    }
    .messages::-webkit-scrollbar-thumb {
        width: 4px;
        background: #888;
    }
    .messages .message {
        margin: 10px 0px;
        display: flex;
    }
    .messages .my-message {
        justify-content: flex-end;
    }
    .messages .message .avatar {
        width: 30px;
        height: 30px;
        margin-right: 8px;
    }
    .messages .message .text {
        padding: 10px;
        background: #f0f4f7;
        color: #555;
        font-size: 13px;
        font-weight: 600;
        max-width: fit-content;
        flex: 1;
        border-radius: 5px;
    }
    .messages .message .avartar img {
        width: 100%;
        height: 100%;
    }
    .messages .my-message .text {
        background: #555;
        color: #fff;
    }
</style>
