import cheerio from 'cheerio';
import { ICountry } from '../../../interfaces';

export interface IGeographicCountryCodesParser {
  getCountryCodes(html: string): ICountry[];
}

export class GeographicCountryCodesParser implements IGeographicCountryCodesParser {
  public getCountryCodes(html: string): ICountry[] {
    const $ = cheerio.load(html);

    return $('.mw-parser-output table tbody tr td b a')
      .map((_, el) => el.childNodes[0].data)
      .toArray()
      .map((countryName) => ({
        id: '',
        name: countryName.toString(),
        alpha2Code: '',
        alpha3Code: '',
      }));
  }
}
