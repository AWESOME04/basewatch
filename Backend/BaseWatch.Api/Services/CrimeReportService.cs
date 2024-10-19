using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using Nethereum.Contracts;
using System.Threading.Tasks;

public class CrimeReportService
{
    private readonly Web3 _web3;
    private readonly string _contractAddress;
    private readonly string _accountPrivateKey;

    private readonly string _abi = @"[
        {
            'constant': false,
            'inputs': [
                {'name': 'reporter', 'type': 'string'},
                {'name': 'content', 'type': 'string'},
                {'name': 'reportType', 'type': 'string'},
                {'name': 'proof', 'type': 'string'},
                {'name': 'latitude', 'type': 'string'},
                {'name': 'longitude', 'type': 'string'}
            ],
            'name': 'submitReport',
            'outputs': [],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'constant': false,
            'inputs': [
                {'name': 'reportId', 'type': 'uint256'},
                {'name': 'basename', 'type': 'string'}
            ],
            'name': 'validateReport',
            'outputs': [],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'constant': true,
            'inputs': [
                {'name': 'basename', 'type': 'string'}
            ],
            'name': 'getReputation',
            'outputs': [
                {'name': '', 'type': 'uint256'}
            ],
            'payable': false,
            'stateMutability': 'view',
            'type': 'function'
        }
    ]";

    public CrimeReportService(string rpcUrl, string contractAddress, string privateKey)
    {
        _accountPrivateKey = privateKey;
        var account = new Account(_accountPrivateKey);
        _web3 = new Web3(account, rpcUrl);
        _contractAddress = contractAddress;
    }

    public async Task<string> SubmitReport(string content, string reportType, string proof, string latitude, string longitude)
    {
        var contract = _web3.Eth.GetContract(_abi, _contractAddress);
        var submitReportFunction = contract.GetFunction("submitReport");

        // Send the transaction to the blockchain
        var txHash = await submitReportFunction.SendTransactionAsync(_web3.TransactionManager.Account.Address, content, reportType, proof, latitude, longitude);
        return txHash;
    }

    public async Task<string> ValidateReport(uint reportId)
    {
        var contract = _web3.Eth.GetContract(_abi, _contractAddress);
        var validateReportFunction = contract.GetFunction("validateReport");

        // Send the validation transaction
        var txHash = await validateReportFunction.SendTransactionAsync(_web3.TransactionManager.Account.Address, reportId);
        return txHash;
    }

    public async Task<string> RejectReport(uint reportId)
    {
        var contract = _web3.Eth.GetContract(_abi, _contractAddress);
        var rejectReportFunction = contract.GetFunction("rejectReport");

        // Send the rejection transaction
        var txHash = await rejectReportFunction.SendTransactionAsync(_web3.TransactionManager.Account.Address, reportId);
        return txHash;
    }

    public async Task<uint> GetReputation(string validatorAddress)
    {
        var contract = _web3.Eth.GetContract(_abi, _contractAddress);
        var getReputationFunction = contract.GetFunction("getReputation");

        // Query the blockchain for validator's reputation
        var reputation = await getReputationFunction.CallAsync<uint>(validatorAddress);
        return reputation;
    }
}
