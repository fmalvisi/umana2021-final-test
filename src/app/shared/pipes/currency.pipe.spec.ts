import { CurrencyEurPipe } from "./currency.pipe"

describe('CurrencyPipe', () => {
    it('create an instance', () => {
        const pipe = new CurrencyEurPipe();
        expect(pipe).toBeTruthy();
    })
})