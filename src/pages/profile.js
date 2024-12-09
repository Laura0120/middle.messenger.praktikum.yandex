export default
`<div class="page">
    <main>
        <h1>Профиль</h1>
        <form class="form_wrapper">
            {{> Input id="avatar" name="avatar" type="file"}}
            {{> Input id="email" name="email" type="text" placeholder="Почта"}}
            {{> Input id="login" name="login" type="text" placeholder="Логин"}}
            {{> Input id="first_name" name="first_name" type="text" placeholder="Имя"}}
            {{> Input id="second_name" name="second_name" type="text" placeholder="Фамилия"}}
            {{> Input id="display_name" name="display_name" type="text" placeholder="Имя в чате"}}
            {{> Input id="phone" name="phone" type="text" placeholder="Телефон"}}
        </form>
        <div class="form_wrapper">
            {{> Link href="" text="Изменить данные" className="link"}}
            {{> Link href="" text="Изменить пароль" className="link"}}
            {{> Link href="" text="Выйти" className="link"}}
        <div/>
    <main/>
</div>`