import type { FunctionalComponent } from 'preact';
import { h, Fragment } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

interface Props {
	headers: any[];
	labels: {
		onThisPage: string;
		overview: string;
	};
}

const TableOfContents: FunctionalComponent<Props> = ({ headers = [], labels }) => {
	const itemOffsets = useRef([]);
	const [activeId, setActiveId] = useState<string>(undefined);

	useEffect(() => {
		const getItemOffsets = () => {
			const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
			itemOffsets.current = Array.from(titles).map((title) => ({
				id: title.id,
				topOffset: title.getBoundingClientRect().top + window.scrollY,
			}));
		};

		const addObservers = () => {
			const observerOptions = {
				root: null,
				rootMargin: '0px',
				threshold: [1],
			};

			const setCurrent = (element) => {
				const tocItems = document.querySelectorAll('.sidebar-nav #toc li');

				element.map((e) => {
					const currentHeadingLink = document.querySelector(`.sidebar-nav #toc li a[href="#${e.target.id}"]`);

					if (e.isIntersecting === true && currentHeadingLink !== null) {
						tocItems.forEach((item) => {
							item.classList.remove('current-header-link');

							if (item.contains(currentHeadingLink)) {
								item.classList.add('current-header-link');
							}
						});
					}
				});
			};

			const observeHeadings = new IntersectionObserver(setCurrent, observerOptions);

			const headings = document.querySelectorAll('article :is(h1,h2,h3,h4):not(nav.sidebar-nav)');

			headings.forEach((header) => {
				observeHeadings.observe(header);
			});
		};

		getItemOffsets();
		window.addEventListener('resize', getItemOffsets);

		addObservers();

		return () => {
			window.removeEventListener('resize', getItemOffsets);
		};
	}, []);

	return (
		<>
			<h2 class="heading">{labels.onThisPage}</h2>
			<ul id="toc">
				<li class={`header-link depth-2 ${activeId === 'overview' ? 'active' : ''}`.trim()}>
					<a href="#overview">{labels.overview}</a>
				</li>
				{headers
					.filter(({ depth }) => depth > 1 && depth < 4)
					.map((header) => (
						<li class={`header-link depth-${header.depth} ${activeId === header.slug ? 'active' : ''}`.trim()}>
							<a href={`#${header.slug}`}>{header.text}</a>
						</li>
					))}
			</ul>
		</>
	);
};

export default TableOfContents;
