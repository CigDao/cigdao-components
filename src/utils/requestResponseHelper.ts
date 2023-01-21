import { RequestResponse, Token } from '../declarations/treasury';

export interface IRequestResponse {
	_type: string;
	type: string;
	id: number;
	token?: 'YC' | 'ICP';
	executedAt?: bigint;
	createdAt: bigint;
	recipient?: string;
	description: string;
	error?: string;
	executed: boolean;
	amount?: bigint;
	power?: bigint;
	principal?: string;
}

export function getRequestResponseType(requestResponse: RequestResponse): IRequestResponse | undefined {
	if ('threshold' in requestResponse) {
		return {
			_type: 'threshold',
			type: 'Threshold',
			id: requestResponse.threshold.id,
			amount: undefined,
			createdAt: requestResponse.threshold.createdAt,
			description: requestResponse.threshold.description,
			error: getError(requestResponse.threshold.error),
			executed: requestResponse.threshold.executed,
			executedAt: getExecutedAt(requestResponse.threshold.executedAt),
			recipient: undefined,
			token: undefined,
			power: requestResponse.threshold.power
		};
	}
	if ('addLiquidity' in requestResponse) {
		return {
			_type: 'addLiquidity',
			type: 'Add liquidity',
			id: requestResponse.addLiquidity.id,
			amount: requestResponse.addLiquidity.amount,
			createdAt: requestResponse.addLiquidity.createdAt,
			description: requestResponse.addLiquidity.description,
			error: getError(requestResponse.addLiquidity.error),
			executed: requestResponse.addLiquidity.executed,
			executedAt: getExecutedAt(requestResponse.addLiquidity.executedAt),
			recipient: undefined,
			token: getToken(requestResponse.addLiquidity.token),
			power: undefined
		};
	}
	if ('swapFor' in requestResponse) {
		return {
			_type: 'swapFor',
			type: 'Swap for',
			id: requestResponse.swapFor.id,
			amount: requestResponse.swapFor.amount,
			createdAt: requestResponse.swapFor.createdAt,
			description: requestResponse.swapFor.description,
			error: getError(requestResponse.swapFor.error),
			executed: requestResponse.swapFor.executed,
			executedAt: getExecutedAt(requestResponse.swapFor.executedAt),
			recipient: undefined,
			token: getToken(requestResponse.swapFor.token),
			power: undefined
		};
	}
	if ('removeMember' in requestResponse) {
		return {
			_type: 'removeMember',
			type: 'Remove member',
			id: requestResponse.removeMember.id,
			amount: undefined,
			createdAt: requestResponse.removeMember.createdAt,
			description: requestResponse.removeMember.description,
			error: getError(requestResponse.removeMember.error),
			executed: requestResponse.removeMember.executed,
			executedAt: getExecutedAt(requestResponse.removeMember.executedAt),
			recipient: undefined,
			token: undefined,
			power: requestResponse.removeMember.power,
			principal: requestResponse.removeMember.principal
		};
	}
	if ('addMember' in requestResponse) {
		return {
			_type: 'addMember',
			type: 'Add member',
			id: requestResponse.addMember.id,
			amount: undefined,
			createdAt: requestResponse.addMember.createdAt,
			description: requestResponse.addMember.description,
			error: getError(requestResponse.addMember.error),
			executed: requestResponse.addMember.executed,
			executedAt: getExecutedAt(requestResponse.addMember.executedAt),
			recipient: undefined,
			token: undefined,
			power: requestResponse.addMember.power,
			principal: requestResponse.addMember.principal
		};
	}
	if ('withdrawLiquidity' in requestResponse) {
		return {
			_type: 'withdrawLiquidity',
			type: 'Withdraw liquidity',
			id: requestResponse.withdrawLiquidity.id,
			amount: requestResponse.withdrawLiquidity.amount,
			createdAt: requestResponse.withdrawLiquidity.createdAt,
			description: requestResponse.withdrawLiquidity.description,
			error: getError(requestResponse.withdrawLiquidity.error),
			executed: requestResponse.withdrawLiquidity.executed,
			executedAt: getExecutedAt(requestResponse.withdrawLiquidity.executedAt),
			recipient: undefined,
			token: undefined,
			power: undefined
		};
	}
	if ('transfer' in requestResponse) {
		return {
			_type: 'transfer',
			type: 'Transfer',
			id: requestResponse.transfer.id,
			amount: requestResponse.transfer.amount,
			createdAt: requestResponse.transfer.createdAt,
			description: requestResponse.transfer.description,
			error: getError(requestResponse.transfer.error),
			executed: requestResponse.transfer.executed,
			executedAt: getExecutedAt(requestResponse.transfer.executedAt),
			recipient: requestResponse.transfer.recipient,
			token: getToken(requestResponse.transfer.token),
			power: undefined
		};
	}
}

export function getToken(token: Token) {
	if ('yc' in token) {
		return 'YC';
	} else {
		return 'ICP';
	}
}

export function getError(error: [] | [string]) {
	const [temp] = error;
	return temp;
}

export function getExecutedAt(executedAt: [] | [bigint]) {
	const [temp] = executedAt;
	return temp;
}
