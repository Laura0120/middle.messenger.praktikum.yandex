export const login =
`<div class="page">
    <header>
        {{> Navigation}}
    </header>
    <main class="form_block">
        <h1 class="form_title">Вход</h1>
        <form class="form_wrapper">
            {{> Input id="login" name="login" type="text" placeholder="Логин"}}
            {{> Input id="password" nmae="password" type="password" placeholder="Пароль"}}
            {{> Button type="submit" text="Авторизоваться" class="button"}}
        </form>
        {{> Link href="" text="Нет аккаунта?" class="link"}}
    <main/>
</div>`
