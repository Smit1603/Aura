/**
 * @jest-environment node
 */
import { GET } from '@/app/api/hello/route';

describe('GET /api/hello', () => {
    it('returns a hello message', async () => {
        const response = await GET();
        const body = await response.json();

        expect(response.status).toBe(200);
        expect(body).toEqual({ message: 'Hello from Next.js' });
    });
});
