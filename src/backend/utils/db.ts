import { connect } from 'mongoose';

const props = {
    isConnected: false
}

export async function conectDatabase(): Promise<boolean> {
    try {
        if (props.isConnected) return true;
        const db = await connect(`${process.env.MONGODB_URL}`);
        props.isConnected = (db.connections[0].readyState === 1)
        return props.isConnected;
    } catch (error: unknown) {
        return false;
    }
}