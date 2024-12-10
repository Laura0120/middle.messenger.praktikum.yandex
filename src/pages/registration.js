export const registration =
`<div class="page">
    <header>
        {{> Navigation}}
    </header>
    <main class="form_block">
        <h1 class="form_title">Регистрация</h1>
        <form>
            {{> Input id="email" name="email" type="text" placeholder="Почта"}}
            {{> Input id="login" name="login" type="text" placeholder="Логин"}}
            {{> Input id="first_name" name="first_name" type="text" placeholder="Имя"}}
            {{> Input id="second_name" name="second_name" type="text" placeholder="Фамилия"}}
            {{> Input id="phone" name="phone" type="text" placeholder="Телефон"}}
            {{> Input id="password" name="password" type="password" placeholder="Пароль"}}
            {{> Input id="repeatPassword" name="repeatPassword" type="password" placeholder="Пароль (еще раз)"}}
            {{> Button type="submit" text="Зарегистрироваться" class="button"}}
        </form>
        {{> Link href="" text="Войти" class="link"}}
    </main>
</div>`
