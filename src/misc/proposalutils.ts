import canisters from './canisterIds';

export async function getBids(id: number): Promise<number> {
    const response = await fetch(`https://${canisters.daoCanisterId}.raw.ic0.app/_getBids/${id}`);
    const json = await response.json();
    return json;
} 