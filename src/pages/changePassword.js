export default
`<div class="page">
    <main>
        <h1>Смена пароля</h1>
        <form class="form_wrapper">
            {{> Input id="oldPassword" name="oldPassword" type="password" placeholder="Старый пароль"}}
            {{> Input id="newPassword" name="newPassword" type="password" placeholder="Новый пароль"}}
            {{> Input id="repeatNewPassword" name="repeatNewPassword" type="password" placeholder="Повторите новый пароль"}}
            {{> Button type="submit" text="Сохранить" className="button"}}
        </form>
    </main>
</div>`
