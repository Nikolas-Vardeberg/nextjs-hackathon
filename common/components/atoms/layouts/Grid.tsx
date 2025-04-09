import { css, styled } from 'styled-components';

export interface SizeProps {
	sm?: number;
    md?: number;
	lg?: number;
}

interface GridProps {
	columns?: SizeProps;
	gap?: SizeProps;
	x?: SizeProps;
	y?: SizeProps;
	container?: boolean;
	rowNotAuto?: boolean;
}

interface GridItemProps {
	colSpan?: SizeProps;
	colStart?: SizeProps;
	card?: boolean;
}

const defaultSizeProps: SizeProps = { sm: 4, lg: 12 }; 
const defaultGap: SizeProps = { sm: 16, lg: 28 }; 

const containerPaddings: SizeProps = { sm: 16, lg: 38 }; 

const generateGridTemplateColumns = (columns: SizeProps = defaultSizeProps) => {
const col = { ...defaultSizeProps, ...columns }; 
	return css`
    grid-template-columns: repeat(${col.sm}, 1fr);
    
    @media (min-width: 1024px) {
      grid-template-columns: repeat(${col.lg}, 1fr);
    }
  `;
};

export const Grid = styled.div
	.attrs((p) => ({
		className: p.className || 'grid',
	}))
	.withConfig({
		shouldForwardProp: (prop) => !['columns', 'gap', 'x', 'y', 'container', 'rowNotAuto'].includes(prop),
	})<GridProps>`
    display: grid;
    width: 100%;
    ${({ container }) => container && `padding: 0 ${containerPaddings.sm}px; margin-left: auto; margin-right: auto;`};
    gap: ${({ gap = defaultGap }) => gap.sm}px; // Default gap
    column-gap: ${({ x = defaultGap }) => x.sm}px; // Default x gap
    row-gap: ${({ y = defaultGap }) => y.sm}px; // Default y gap
    grid-template-columns: repeat(${(props) => props.columns?.sm || defaultSizeProps.sm}, 1fr); // Default columns
    ${({ rowNotAuto }) => !rowNotAuto && ' grid-auto-rows: 1fr;'}

    ${(props) => generateGridTemplateColumns(props.columns)}

    @media (min-width: 768px) {
    	gap: ${({ gap = defaultGap }) => gap.md}px;
        ${({ container }) => container && `padding: 0 ${containerPaddings.md}px;`};
        column-gap: ${({ x = defaultGap }) => x.md}px;
        row-gap: ${({ y = defaultGap }) => y.md}px;
        grid-template-columns: repeat(${(props) => props.columns?.md || props.columns?.md || defaultSizeProps.md}, 1fr);
    }

    @media (min-width: 1024px) {
        gap: ${({ gap = defaultGap }) => gap.lg}px;
        ${({ container }) => container && `padding: 0 ${containerPaddings.lg}px;`};
        column-gap: ${({ x = defaultGap }) => x.lg}px;
        row-gap: ${({ y = defaultGap }) => y.lg}px;
        grid-template-columns: repeat(${(props) => props.columns?.lg || props.columns?.sm || defaultSizeProps.lg}, 1fr);
    }
`;

const generateGridColumn = (colSpan?: SizeProps, colStart?: SizeProps) => {
	const defaultSpan = { sm: 4, lg: 12 };
	const span = {
		...defaultSpan,
		sm: colSpan?.sm || defaultSpan.sm,
		lg: colSpan?.lg || colSpan?.sm || defaultSpan.lg,
	};
	const start = {
		...{ sm: 1, lg: 1 },
		sm: colStart?.sm || 1,
		lg: colStart?.lg || colStart?.sm || 1,
	};

	return css`
    display: inline-grid;
    grid-column: ${start.sm} / span ${span.sm};

    @media (min-width: 1024px) {
      grid-column: ${start.lg} / span ${span.lg};
    }
  `;
};

export const GridItem = styled.div.withConfig({
	shouldForwardProp: (prop) => !['colSpan', 'colStart', 'card'].includes(prop),
})<GridItemProps>`
  ${(props) => generateGridColumn(props.colSpan, props.colStart)}
`;
