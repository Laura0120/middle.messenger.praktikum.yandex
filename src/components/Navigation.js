export default `<nav class="nav">
    <ul class="nav_list">
        <li>{{> Link href="#" dataPage="login" text="Вход" class="nav_link"}}<li/>
        <li>{{> Link href="#" dataPage="registration" text="Регистрация" class="nav_link"}}<li/>
        <li>{{> Link href="#" dataPage="profile" text="Профиль" class="nav_link"}}<li/>
        <li>{{> Link href="#" dataPage="editeProfile" text="Редактирование профиля" class="nav_link"}}<li/>
        <li>{{> Link href="#" dataPage="changePassword" text="Смена пароля" class="nav_link"}}<li/>
        <li>{{> Link href="#" dataPage="chatList" text="Список чатов" class="nav_link"}}<li/>
        <li>{{> Link href="#" dataPage="error_404" text="Ошибка 404" class="nav_link"}}<li/>
        <li>{{> Link href="#" dataPage="error_500" text="Ошибка 500" class="nav_link"}}<li/>
    </ul>
</nav>`
