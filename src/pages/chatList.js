export const chatList =
`<div class="page">
    <header>
        {{> Navigation}}
    </header>
    <main>
        <h1>Список чатов</h1>
        <div class="chats_wrapper">
            <div>
                {{> Link href="" text="Профиль" class="link"}}
                <form>
                    {{> Input id="message" name="message" type="text" placeholder="Поиск"}}
                </form>
            </div>
            <div>Выберите чат чтобы отправить сообщение</div>
        </div>
    </main>
</div>`
