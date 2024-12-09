export default
`<div class="page">
    <main class="form_block">
        <h1 class="form_title">Вход</h1>
        <form class="form_wrapper">
            {{> Input id="login" name="login" type="text" placeholder="Логин"}}
            {{> Input id="password" nmae="password" type="password" placeholder="Пароль"}}
            {{> Button type="submit" text="Авторизоваться" className="button"}}
        </form>
        {{> Link href="" text="Нет аккаунта?" className="link"}}
    <main/>
</div>`
