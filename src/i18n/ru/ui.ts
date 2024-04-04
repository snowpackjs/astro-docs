import { UIDictionary } from '../translation-checkers';

export default UIDictionary({
	'a11y.skipLink': 'Перейти к содержанию',
	'a11y.sectionLink': 'Заголовок раздела',
	'navbar.a11yTitle': 'Вверх',
	// Site settings
	'site.title': 'Документация Astro',
	'site.description':
		'Создавайте более быстрые сайты с меньшим количеством JavaScript на стороне клиента.',
	'site.og.imageSrc': '/default-og-image.png?v=1',
	'site.og.imageAlt':
		'логотип Astro на звездном просторе космоса, с фиолетовой планетой, похожей на Сатурн, плывущей справа на переднем плане',
	// Left Sidebar
	'leftSidebar.a11yTitle': 'Главное',
	'leftSidebar.learnTab': 'Изучить',
	'leftSidebar.referenceTab': 'Справка',
	'leftSidebar.viewInEnglish': 'Просмотр на английском языке',
	'leftSidebar.sponsoredBy': 'При поддержке',
	// Right Sidebar
	'rightSidebar.a11yTitle': 'Побочное',
	'rightSidebar.onThisPage': 'На этой странице',
	'rightSidebar.overview': 'Обзор',
	'rightSidebar.community': 'Сообщество',
	'rightSidebar.joinDiscord': 'Присоединяйтесь к нам в Discord',
	'rightSidebar.readBlog': 'Наш блог',
	'rightSidebar.openCollective': 'Наш Open Collective',
	'rightSidebar.contribute': 'Внести свой вклад',
	'rightSidebar.contributorGuides': 'Руководства для участников',
	'rightSidebar.editPage': 'Редактировать эту страницу',
	'rightSidebar.translatePage': 'Перевести эту страницу',
	'rightSidebar.github': 'Документация Astro на GitHub',
	// Footer
	'footer.privacyPolicy': 'Политика конфиденциальности',
	// `<ThemeToggleButton>` acessibility labels
	'themeToggle.useLight': 'Использовать светлую тему',
	'themeToggle.useDark': 'Использовать темную тему',
	// Used in previous/next page links at the bottom of pages
	'articleNav.nextPage': 'Следующая страница',
	'articleNav.prevPage': 'Назад',
	// Used in `<Since>`: Added in: v0.24.0 [NEW]
	'since.addedIn': 'Добавлено в:',
	'since.new': 'Новое',
	'since.beta': 'Бета',
	// Installation Guide
	'install.autoTab': 'Автоматическая установка через CLI',
	'install.manualTab': 'Ручная настройка',
	// `<DeployGuidesNav>` vocabulary
	'deploy.sectionTitle': 'Руководства по развертыванию',
	'deploy.altSectionTitle': 'Дополнительные руководства по развертыванию',
	'deploy.filterLabel': 'Фильтровать по типу развертывания',
	'deploy.ssrTag': 'SSR',
	'deploy.staticTag': 'Статический',
	// CMS Guides vocabulary
	'cms.navTitle': 'Дополнительные руководства по CMS',
	// Migration Guides vocabulary
	'migration.navTitle': 'Дополнительные руководства по миграции',
	// Recipes vocabulary
	'recipes.navTitle': 'Дополнительные инструкции',
	// `<RecipeLinks>` vocabulary
	'recipesLink.singular': 'Связанная инструкция:',
	'recipesLink.plural': 'Связанные инструкции',
	// `<ContributorList>` fallback text
	'contributors.seeAll': 'Посмотреть всех участников',
	// Fallback content notice shown when a page is not yet translated
	'fallbackContent.notice':
		'Эта страница еще не доступна на вашем языке, поэтому мы показываем вам английскую версию. Вы можете помочь, переведя ее!',
	'fallbackContent.linkText': 'Узнайте больше о том, как вы можете помочь',
	// 404 Page
	'404.title': 'Не Найдено',
	'404.content': 'Этой страницы нет в нашей Солнечной системе',
	'404.linkText': 'Вернуться домой.',
	// Aside component default labels
	'aside.note': 'Примечание',
	'aside.tip': 'Подсказка',
	'aside.caution': 'Осторожно',
	'aside.danger': 'Опасность',
	// `<LanguageSelect>` vocabulary
	'languageSelect.label': 'Выберите язык',
	// Integrations vocabulary
	'integrations.changelog': 'Список изменений',
	'integrations.footerTitle': 'Дополнительные интеграции',
	'integrations.renderers': 'UI-фреймворки',
	'integrations.adapters': 'SSR адаптеры',
	'integrations.others': 'Другие интеграции',
	'integrations.more': 'Дополнительные интеграции',
	// Checklist component
	'checklist.or': 'или',
	// Multiple Choice component
	'multipleChoice.defaultCorrect': 'Верно!',
	'multipleChoice.defaultIncorrect': 'Попробуйте еще раз!',
	'multipleChoice.submitLabel': 'Отправить',
	// Tutorial Progress
	'progress.todo': 'В процессе',
	'progress.done': 'Завершено',
	// Tutorial Navigation
	'tutorial.trackerLabel': 'Трекер обучения',
	'tutorial.unit': 'Единица',
	// Tutorial
	'tutorial.getReady': 'Приготовьтесь…',
	// Feedback Fish widget
	'feedback.button': 'Оставить отзыв',
	'feedback.a11yLabel': 'Форма обратной связи',
	'feedback.formTitle': 'Что у вас на уме?',
	'feedback.categoryGroupLabel': 'Выберите категорию обратной связи',
	'feedback.issue': 'Проблема',
	'feedback.createIssue': 'Создать проблему в GitHub',
	'feedback.createIssue.description': 'Самый быстрый способ предупредить нашу команду о проблеме.',
	'feedback.sendFeedback': 'Отправить нам отзыв',
	'feedback.sendFeedback.description': 'Отправьте нам сообщение напрямую.',
	'feedback.idea': 'Идея',
	'feedback.other': 'Другое',
	'feedback.messageA11yLabel': 'Сообщение',
	'feedback.placeholder': 'Что вы хотите, чтобы мы знали?',
	'feedback.submit': 'Отправить отзыв',
	'feedback.close': 'Закрыть форму обратной связи',
	'feedback.success': 'Спасибо! Мы получили ваш отзыв.',
	// Code snippet vocabulary
	'expressiveCode.terminalWindowFallbackTitle': 'Окно терминала',
	'expressiveCode.copyButtonTooltip': 'Копировать в буфер обмена',
	'expressiveCode.copyButtonCopied': 'Скопировано!',
	// Backend Guides vocabulary
	'backend.navTitle': 'Дополнительные руководства по бэкенд-сервисам',
	// Stubs vocabulary
	'stub.title': 'Раскрыть эту заглушку!',
	'stub.subtitle': 'Это руководство - заглушка.',
	'stub.description.migration':
		'Хотите внести свой вклад в это руководство? У вас есть статья в блоге, видео или другой ресурс о переходе с этой технологии на Astro?',
	'stub.description.cms': 'Хотите узнать больше о том, как использовать эту CMS с Astro?',
	'stub.description.backend':
		'Хотите узнать больше о том, как использовать этот бэкенд-сервис с Astro?',
	// Starlight banner
	'starlight.title': 'Хотите создать свою собственную документацию?',
	'starlight.description': 'Возьмите этот шаблон, чтобы начать.',
	// `<StudioHeading>` component
	'studioHeading.label': 'Особенность Studio',
});
