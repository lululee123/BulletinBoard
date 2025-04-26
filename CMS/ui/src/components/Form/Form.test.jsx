import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TonicProvider, InputAdornment } from '@tonic-ui/react';
import { SearchOIcon } from '@tonic-ui/react-icons';
import dayjs from 'dayjs';
import { FormContainer } from './FormContainer';
import { FormInlineError } from './FormInlineError';
import { FormLabel } from './FormLabel';
import { FormRowDropDown } from './FormRowDropDown';
import { FormRowInput } from './FormRowInput';
import { FormRowCountry } from './FormRowCountry';
import { FormRowCredit } from './FormRowCredit';
import { FormRowServicePlan } from './FormRowServicePlan';
import { FormRowDatePicker } from './FormRowDatePicker';

describe('Form component', () => {
  it('should render FormContainer', () => {
    render(
      <TonicProvider>
        <FormContainer>Form Container</FormContainer>
      </TonicProvider>
    );

    expect(screen.getByText('Form Container')).toBeInTheDocument();
  });

  it('should render FormInlineError', () => {
    render(
      <TonicProvider>
        <FormInlineError data-testid="form-inline-error">error</FormInlineError>
      </TonicProvider>
    );

    expect(screen.getByText('error')).toBeInTheDocument();
    expect(screen.getByTestId('form-inline-error')).toHaveStyle(
      'color: #f24c4f'
    );
  });

  it('should render FormLabel - with required', async () => {
    const result = render(
      <TonicProvider>
        <FormLabel required label="label" toolTip="toolTip" />
      </TonicProvider>
    );

    // required
    expect(result).toMatchSnapshot();

    // label
    expect(screen.getByText('label')).toBeInTheDocument();

    // toolTip
    fireEvent.mouseOver(screen.getByTestId('form-label-tooltip'));
    expect(await screen.findByText('toolTip')).toBeInTheDocument();
  });

  it('should render FormLabel - without required', () => {
    const result = render(
      <TonicProvider>
        <FormLabel label="label" />
      </TonicProvider>
    );

    expect(result).toMatchSnapshot();
  });

  it('should render FormRowDropDown', async () => {
    const onChange = vi.fn();
    const { findByText } = render(
      <TonicProvider>
        <FormRowDropDown
          required
          label="FormRowDropDown"
          toolTip="toolTip"
          value="test"
          list={[
            { key: 'test', value: 'test' },
            { key: 'test2', value: 'test2' },
          ]}
          onChange={onChange}
        />
      </TonicProvider>
    );

    fireEvent.click(screen.getByTestId('form-dropdown-toggle'));
    fireEvent.click(await findByText('test2'));
    expect(onChange).toBeCalled();
  });

  it('should render FormRowInput', async () => {
    const onChange = vi.fn();
    const result = render(
      <TonicProvider>
        <FormRowInput
          required
          label="FormRowInput"
          toolTip="toolTip"
          inputs={[
            {
              value: 'test',
              type: 'string',
              key: 'form-row-input1',
              placeholder: 'placeholder',
              startAdornment: (
                <InputAdornment display="flex">
                  <SearchOIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment display="flex">
                  <SearchOIcon />
                </InputAdornment>
              ),
              error: 'error',
              onChange,
            },
          ]}
        />
      </TonicProvider>
    );
    const input = screen.getByTestId('form-row-input1');

    // required
    expect(result).toMatchSnapshot();

    // toolTip
    fireEvent.mouseOver(screen.getByTestId('form-label-tooltip'));
    expect(await screen.findByText('toolTip')).toBeInTheDocument();

    // label
    expect(screen.getByText('FormRowInput')).toBeInTheDocument();

    // input - placeholder
    expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();

    // inputs - value
    expect(screen.getByDisplayValue('test')).toBeInTheDocument();

    // inputs - onChange
    fireEvent.change(input, { target: { value: 'test2' } });
    expect(onChange).toBeCalled();

    // inputs - startAdornment, endAdornment, error
    expect(result).toMatchSnapshot();

    // inputs - error
    expect(screen.getByText('error')).toBeInTheDocument();
  });

  it('should render FormRowCountry', async () => {
    const onChange = vi.fn();
    const { findByText } = render(
      <TonicProvider>
        <FormRowCountry
          required
          label="FormRowCountry"
          toolTip="toolTip"
          value="test"
          list={[
            { key: 'test', value: 'test' },
            { key: 'test2', value: 'test2' },
          ]}
          onChange={onChange}
        />
      </TonicProvider>
    );
    fireEvent.click(screen.getByTestId('form-dropdown-toggle'));
    fireEvent.click(await findByText('test2'));
    expect(onChange).toBeCalled();
  });

  it('should render FormRowCredit - with commas - 1,000', async () => {
    render(
      <TonicProvider>
        <FormRowCredit annualCredit={10} volume={100} />
      </TonicProvider>
    );

    expect(screen.getByText('1,000')).toBeInTheDocument();
  });

  it('should render FormRowCredit - without commas - 100', async () => {
    render(
      <TonicProvider>
        <FormRowCredit annualCredit={10} volume={10} />
      </TonicProvider>
    );

    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('should render FormRowServicePlan', async () => {
    const onChange = vi.fn();
    render(
      <TonicProvider>
        <FormRowServicePlan
          value="d6edd84b-3cce-4501-9ee2-4d2b1a55929b"
          list={[
            {
              VersionType: '0',
              ServicePlanID: 'd6edd84b-3cce-4501-9ee2-4d2b1a55929b',
              ServicePlanName: 'ASRM_Free_Trial',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: 'd3bc2186-6796-4dcf-858c-bf00323f3dbb',
              ServiceName: 'Trend Vision One - Attack Surface Risk Management',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 0,
              IsAutoReNew: 0,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Software',
              PriceType: 'L',
              ChargeableMonth: 0,
              IsDelegation: '0',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 20,
              PID: 'VOAKZIM1X',
              X_Product: 'asrm',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '27da2424-c608-46f6-b4a7-8da26e4fd2a2',
              ServicePlanName: 'ASRM_full',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: 'd3bc2186-6796-4dcf-858c-bf00323f3dbb',
              ServiceName: 'Trend Vision One - Attack Surface Risk Management',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 0,
              IsAutoReNew: 0,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Software',
              PriceType: 'L',
              ChargeableMonth: 0,
              IsDelegation: '0',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 20,
              PID: 'VOAKZIM1X',
              X_Product: 'asrm',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '1e4bea34-e1d1-4e24-8076-dfc0b8a58adf',
              ServicePlanName: 'CAS_full_autoRenew',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '89c15215-8ed0-4eb4-aa3f-0b77a564f9e0',
              ServiceName: 'XSP-TMCAS',
              DCCode: '22',
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'SaaS',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 25,
              PID: 'NNZBZZE1X',
              X_Product: 'cas',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '623758df-5939-4c50-a719-fb029529ca44',
              ServicePlanName: 'CAS-ADV-Full',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '242784fe-4279-4548-bc5f-b81cc0ea2056',
              ServiceName: 'TMCAS-ADV',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: null,
              PID: 'NNZHZZE1X',
              X_Product: 'cas-adv',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '933c2292-392b-40b8-af8b-db70c25efc1d',
              ServicePlanName: 'CMXDR_full_autoRenew',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: 'c56d6444-cbae-4b49-ba27-0b4ad3f58639',
              ServiceName:
                'Worry-Free with Co-Managed XDR (WF XDR & MDR bundle)',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 132,
              PID: 'WFSBZZMAX',
              X_Product: 'wfbss-co-xdr',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: 'afd60d9c-8fef-47e8-8ab3-0b9311f60b05',
              ServicePlanName: 'IWSAAS',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '9c5a734d-5ebd-4b70-999c-4f636b7c5bd4',
              ServiceName: 'XSP-ICS',
              DCCode: '22',
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 0,
              IsAutoReNew: 0,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'SaaS',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 56,
              PID: 'IYZBZZE10',
              X_Product: 'iwsaas',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '3b621b62-5605-4cc2-91fe-d5ab5bdca7db',
              ServicePlanName: 'Lulu_test_addon_01',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '89c15215-8ed0-4eb4-aa3f-0b77a564f9e0',
              ServiceName: 'XSP-TMCAS',
              DCCode: '22',
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 0,
              IsAutoReNew: 0,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'SaaS',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 25,
              PID: 'NNZBZZE1X',
              X_Product: 'cas',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '18a30c92-0448-43f0-987f-d7600f874f16',
              ServicePlanName: 'Lulu_test_addon_02',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '4a2d69a5-67c8-4dcb-8070-1de16b46e178',
              ServiceName: 'CloudEdge50e',
              DCCode: '22',
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 0,
              IsAutoReNew: 0,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'SaaS',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 180,
              PID: 'UTMMVSE50',
              X_Product: 'ce',
              X_Template: 'ce',
              X_Provision: true,
              DeviceModel: 'CE50E',
              X_AddOn: null,
            },
            {
              VersionType: '1',
              ServicePlanID: '531985ee-da14-4dbe-994f-7b2b7074ffa0',
              ServicePlanName: 'Lulu_test_addon_03',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '7c7a87a0-18cd-4b04-9dbc-fd4c50c5fc57',
              ServiceName: 'WFSVC-EDR Standard Bundle',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 0,
              IsAutoReNew: 0,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 65,
              PID: 'WFZZZZMXS',
              X_Product: 'wfbss-edr-std',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: 'ee885ef4-942c-4dce-863b-ab73aff13b12',
              ServicePlanName: 'WFBSS_full_autoRenew',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '4e299f3c-ed1e-4deb-9b5b-eec808cc3560',
              ServiceName: 'XSP-WFBSS',
              DCCode: '22',
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'SaaS',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 38,
              PID: 'WFSBWXE3X',
              X_Product: 'wfbss',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '861c7953-79cd-4cf1-9e3b-3f1da15bed3b',
              ServicePlanName: 'WFBSS-ADV_full_autoRenew',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: 'd0a837fd-e007-4e8f-af57-f8c2d0cb8c73',
              ServiceName: 'WBZZZZE2X',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 60,
              PID: 'WBZZZZE2X',
              X_Product: 'wfbss-adv',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '8fb460be-6e9e-4229-9560-d6352da5c941',
              ServicePlanName: 'WFBSS-EDR_full_autoRenew',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '7c7a87a0-18cd-4b04-9dbc-fd4c50c5fc57',
              ServiceName: 'WFSVC-EDR Standard Bundle',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 65,
              PID: 'WFZZZZMXS',
              X_Product: 'wfbss-edr-std',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: 'cec60917-5f91-4df7-a531-10ea47e56a72',
              ServicePlanName: 'WFBSS-Full',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '4e299f3c-ed1e-4deb-9b5b-eec808cc3560',
              ServiceName: 'XSP-WFBSS',
              DCCode: '22',
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'SaaS',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 38,
              PID: 'WFSBWXE3X',
              X_Product: 'wfbss',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '631ecf16-2658-4c02-80b5-c0601f4bc46f',
              ServicePlanName: 'WFEDR-Full',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '7c7a87a0-18cd-4b04-9dbc-fd4c50c5fc57',
              ServiceName: 'WFSVC-EDR Standard Bundle',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 65,
              PID: 'WFZZZZMXS',
              X_Product: 'wfbss-edr-std',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '2726bde3-008d-4287-8a90-a52fad236292',
              ServicePlanName: 'WFXDR_full_autoRenew',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '09ac2078-f752-4ab7-9ae6-7a81ab30c168',
              ServiceName: 'WFSVC-EDR Advanced Bundle',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 97,
              PID: 'WFZZZZMXA',
              X_Product: 'wfbss-edr-adv',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '679482de-6c7d-48b6-8b50-21196ca44158',
              ServicePlanName: 'WFXDR_NFR',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '09ac2078-f752-4ab7-9ae6-7a81ab30c168',
              ServiceName: 'WFSVC-EDR Advanced Bundle',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 1,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: true,
              NFRSeatCount: 25,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 97,
              PID: 'WFZZZZMXA',
              X_Product: 'wfbss-edr-adv',
              X_Template: 'wfbss',
              X_Provision: true,
            },
            {
              VersionType: '1',
              ServicePlanID: '601eac56-0f15-49d5-a1f2-a882f1fae738',
              ServicePlanName: 'WFXDR-Full',
              VendorCompanyID: '7ccb1c98-cf7e-4a05-98c9-2ea58e76ae4e',
              ServiceID: '09ac2078-f752-4ab7-9ae6-7a81ab30c168',
              ServiceName: 'WFSVC-EDR Advanced Bundle',
              DCCode: null,
              LicensePeriodMonth: 1,
              DaysToExpire: 30,
              AutoExtensionMonth: 2,
              IsAutoReNew: 1,
              ActivationType: 1,
              Enabled: 1,
              ContractType: 'Suite',
              PriceType: 'U',
              ChargeableMonth: 0,
              IsDelegation: '1',
              IsNFR: false,
              NFRSeatCount: 0,
              ChannelID: '27ecd99b-ca97-403c-9274-22c52a2db76b',
              SalesType: 'M',
              AnnualCredit: 97,
              PID: 'WFZZZZMXA',
              X_Product: 'wfbss-edr-adv',
              X_Template: 'wfbss',
              X_Provision: true,
            },
          ]}
          onChange={onChange}
        />
      </TonicProvider>
    );

    // label
    expect(screen.getByText('Service plan:')).toBeInTheDocument();
  });

  it('should render FormRowDatePicker', async () => {
    const date = '2024-11-05';
    const onChange = vi.fn();
    const result = render(
      <TonicProvider>
        <FormRowDatePicker
          required
          disabled={false}
          label="Start date:"
          value={date}
          minDate={dayjs.utc(date)}
          format="YYYY-MM-DD"
          onChange={onChange}
        />
      </TonicProvider>
    );

    expect(result).toMatchSnapshot();

    // label
    expect(screen.getByText('Start date:')).toBeInTheDocument();
  });
});
