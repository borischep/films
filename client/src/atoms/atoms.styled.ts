import styled from 'styled-components';

interface Props {
  [key: string]: any;
}

export const WrapperColumn = styled.div<Props>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: ${(props) => props.alignSide};
	padding-top: 10px;
	background: ${(props) => props.theme.mainBg};
`;

export const WrapperRowWrap = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
`;

export const WrapperWithMargin = styled.div<Props>`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${(props) => props.margin ? props.margin : '0 0 30px 0'};
`;

export const Text = styled.div`
	margin: 10px 0;
	font-size: 24px;
	color: ${(props) => props.theme.textColor};
`;

export const ErrorText = styled(Text)`
	font-size: 14px;
	color: red;
`;

export const Input = styled.input<Props>`
	width: ${(props) => props.width};
	border-radius: 10px;
	border: none;
	margin: ${(props) => props.margin};
	padding: 5px;
	font-size: 20px;
	border: ${(props) => props.border};
	background: ${(props) => props.theme.inputBg};
	color: ${(props) => props.theme.inputText};
	box-sizing: border-box;
`;

export const Select = styled.select<Props>`
	width: ${(props) => props.width};
	border-radius: 10px;
	border: none;
	margin: ${(props) => props.margin};
	padding: 5px;
	font-size: 20px;
	border: ${(props) => props.border};
	background: ${(props) => props.theme.inputBg};
	color: ${(props) => props.theme.inputText};
	box-sizing: border-box;
`;

export const ButtonWithBorderRadius = styled.button<Props>`
	border-radius: 10px;
	padding: 10px;
	border: none;
	cursor: pointer;
	background: ${(props) => props.theme.btnBg};
	color: ${(props) => props.theme.btnText};
	margin: ${(props) => props.withMargin};
`;
